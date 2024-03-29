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
        frame: false,
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
        event.reply('returnData', { action: 'INIT', data: json })
    })
    ipcMain.on('setData', async (event, args) => {
        const writeResult = await handleData(args)
        event.reply('returnData', {
            data: writeResult,
            action: 'ACTION_FINISH',
        })
    })
    ipcMain.on('test', async (event, args) => {
        myConsole.log('TESTING ELECTRON: ', args)
        event.reply('returnData', { data: null, action: 'TEST' })
    })

    ipcMain.on('performWindowAction', (event, args) => {
        switch (args) {
            case 'minify':
                mainWindow.minimize()
                break
            case 'close':
                mainWindow.close()
                app.quit()
                break
            case 'maximize':
                mainWindow.maximize()

                break
        }
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
