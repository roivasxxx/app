const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
var nodeConsole = require('console')
const { handleData } = require('./db/db_handler')

let mainWindow
var myConsole = new nodeConsole.Console(process.stdout, process.stderr)

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, '/db/preload.js'),
        },
    })
    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, '..build/index.html'))
    } else {
        mainWindow.loadURL('http://localhost:3000')
    }
    ipcMain.on('getData', (event, args) => {
        // mainWindow.webContents.send(
        //   "returnData",
        //   "responding to your getData request"
        // );
        const json = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../db/db.json'))
        )
        event.reply('returnData', json)
    })
    ipcMain.on('setData', async (event, args) => {
        const writeResult = await handleData(args)
        event.reply('returnData', writeResult)
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
