const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  get: (channel, data) => {
    ipcRenderer.send("getData", data);
  },
  sendBack: (channel, func) => {
    ipcRenderer.on("returnData", (event, data) => func(data));
    //return returnVal;
  },
  db: {
    get(message, data) {
      ipcRenderer.send("getData", message, data);
    },
  },
});
