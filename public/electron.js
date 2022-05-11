const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "..build/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:3000");
  }
  ipcMain.on("getData", (event, args) => {
    console.log("args", args);
    // mainWindow.webContents.send(
    //   "returnData",
    //   "responding to your getData request"
    // );
    event.reply("returnData", "responding to your getData request");
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
