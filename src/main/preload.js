const { contextBridge, ipcRenderer} = require('electron');
const utils = require('../utils/util')
const path = require('path')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  ipcOn: (name, func) => {
    ipcRenderer.on(name, func)
  }
});

contextBridge.exposeInMainWorld('utils', {
  ...utils,
  path,
});
