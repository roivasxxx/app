const fs = require("fs");
const path = require("path");
var nodeConsole = require("console");
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const DB_PATH = path.join(__dirname, "../../db/db.json");

const DEFAULT_DB = '{"tasks": [],"notes": []}';

const ERRORS = {
  DB_FILE_NOT_FOUND: "ENOENT_READ",
  CORRUPTED_JSON: "CORRUPTED_JSON",
};

exports.handleData = async (req) => {
  try {
    myConsole.log("handleData: ", req);
    const currentDbData = await getData();
    if (currentDbData === "ENOENT") throw ERRORS.DB_FILE_NOT_FOUND;
    if (currentDbData === ERRORS.CORRUPTED_JSON) throw ERRORS.CORRUPTED_JSON;
    myConsole.log("Successfully read db data!");
    const updatedDbData = processData(req, currentDbData);
    myConsole.log("Updated db data");
    const writeResult = await writeToDb(updatedDbData);
    if (writeResult) {
      myConsole.log("Write result: ", writeResult);
      return updatedDbData;
    }
  } catch (error) {
    myConsole.error("Error while handling data: ", error);
    if (error === ERRORS.DB_FILE_NOT_FOUND) {
      myConsole.log("Creating new db file");
      const result = await createFile();
      if (result) {
        myConsole.log("Created db file!");
        return JSON.parse(DEFAULT_DB);
      }
    } else if (error === ERRORS.CORRUPTED_JSON) {
      console.error("Corrupted db.json file!");
    }
  }
};

const processData = (req, data) => {
  try {
    //[ { action: 'addNew', collection: 'tasks', data: [ [Object] ] } ]
    for (let i = 0; i < req.length; i++) {
      const temp = req[i];
      let actionType = temp.action;
      const srcCol = temp.collection;
      const srcColLen = data[srcCol].length;
      const lastColEl =
        srcColLen > 0 ? Math.max(...data[srcCol].map((el) => el.id)) + 1 : 0;
      switch (actionType) {
        case "addNew":
          const colData = temp.data;
          for (let j = 0; j < colData.length; j++) {
            data[srcCol].push({
              ...colData[j],
              id: lastColEl + j,
            });
          }
          break;
        case "delete":
          data[srcCol] = data[srcCol].filter(
            (entry) => !temp.data.includes(entry.id)
          );
          break;
        case "update":
          const ids = temp.data.map((entry) => entry.id);
          data[srcCol] = data[srcCol].map((entry) => {
            if (ids.includes(entry.id)) {
              const newData = temp.data.find((el) => el.id === entry.id);
              return newData;
            }
            return entry;
          });
          break;
      }
    }
    return data;
  } catch (error) {
    console.error("Error while processing data: ", error);
    return data;
  }
};

const getData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") resolve(err.code);
        reject(err);
      } else {
        if (isJsonString(data)) resolve(JSON.parse(data));
        else {
          resolve(ERRORS.CORRUPTED_JSON);
        }
      }
    });
  });
};

const createFile = () => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path.join(__dirname, "../db/"), (err) => {
      if (err.code !== "EEXIST") {
        myConsole.log(err);
        reject(err);
      } else {
        fs.writeFile(DB_PATH, DEFAULT_DB, "utf8", (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("FILE_CREATED");
          }
        });
      }
    });
  });
};

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const writeToDb = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_PATH, JSON.stringify(data), (err) => {
      if (err) reject(err);
      else resolve("SUCCESS");
    });
  });
};

exports.getData;
