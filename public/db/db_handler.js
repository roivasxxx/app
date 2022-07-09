const fs = require("fs");
const path = require("path");
var nodeConsole = require("console");
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const DB_PATH = path.join(__dirname, "../../db/db.json");

const DEFAULT_DB = '{"tasks": [],"notes": []}';

const errors = {
  DB_FILE_NOT_FOUND: "ENOENT_READ",
};

exports.handleData = async (req) => {
  try {
    myConsole.log("handleData: ", req);
    const currentDbData = await getData();
    if (currentDbData === "ENOENT") throw errors.DB_FILE_NOT_FOUND;
    myConsole.log("Reading db file: ", currentDbData);
  } catch (error) {
    myConsole.error("Error while handling data: ", error);
    if (error === errors.DB_FILE_NOT_FOUND) {
      myConsole.log("Creating new db file");
      const result = await createFile();
      if (result) {
        myConsole.log("Created db file!");
      }
    }
  }
};

const getData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") resolve(err.code);
        reject(err);
      } else {
        resolve(JSON.parse(data));
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

exports.getData;
