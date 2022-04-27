const { contextBridge, ipcRenderer} = require('electron');
const utils = require('./util')
const path = require('path')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
});

contextBridge.exposeInMainWorld('utils', {
  storeDataAtLocal: utils.storeDataAtLocal,
  path,
  storePosition: utils.storePosition,
});
