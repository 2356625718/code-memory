const { contextBridge, ipcRenderer} = require('electron');
const utils = require('../utils/util')
const path = require('path')

console.log(ipcRenderer)
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
  ipcOn: (name, func) => {
    ipcRenderer.on(name, func)
  }
});

contextBridge.exposeInMainWorld('utils', {
  storeDataAtLocal: utils.storeDataAtLocal,
  path,
  storePosition: utils.storePosition,
});
