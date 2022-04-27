/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
const path = require('path');
const fs = require('fs')
const os = require('os')

const homedir = os.homedir()

let resolveHtmlPath

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}

const storeDataAtLocal = (data) => {
  fs.exists(homedir + '/code-memory', (exists) => {
    if (!exists) {
      fs.mkdirSync(homedir + '/code-memory')
    }
    let storeData = {
      data
    }
    fs.writeFile(homedir + '/code-memory/snippets.json', JSON.stringify(storeData), {}, () => {
      console.log('写入成功')
    })
  })
}

const storePosition = (data) => {
  fs.exists(homedir + '/code-memory', (exists) => {
    if (!exists) {
      fs.mkdirSync(homedir + '/code-memory')
    }
    fs.writeFile(homedir + '/code-memory/setting.json', JSON.stringify(data), {}, () => {
      console.log('写入成功')
    })
  })
}

module.exports = {
  resolveHtmlPath,
  storeDataAtLocal,
  storePosition,
}


