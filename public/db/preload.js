const { contextBridge, ipcRenderer } = require('electron')
var nodeConsole = require('console')

var myConsole = new nodeConsole.Console(process.stdout, process.stderr)

contextBridge.exposeInMainWorld('electron', {
    init: (channel, data) => {
        myConsole.log('INIT APP')
        ipcRenderer.send('getData', data)
    },
    sendBack: (channel, func) => {
        ipcRenderer.on('returnData', (event, data) => {
            //myConsole.log('SEND BACK!!!')
            console.log('SEND BACK!!!')
            func(data)
        })
        //return returnVal;
    },
    set: (actions) => {
        ipcRenderer.send('setData', actions)
    },
    test: (actions) => {
        ipcRenderer.send('test', actions)
    },
    db: {
        get(message, data) {
            ipcRenderer.send('getData', message, data)
        },
    },
    performWindowAction: (actionType) => {
        ipcRenderer.send('performWindowAction', actionType)
    },
})
