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

// 创建文件夹及文件
const mkdir = () => {
  fs.exists(homedir + '/code-memory', async (exists) => {
    if (!exists) {
      fs.mkdirSync(homedir + '/code-memory')
    }
    const files = ['/code-memory/snippets.json', '/code-memory/setting.json', '/code-memory/user.json']
    for (let file of files) {
      let filepath = homedir + file
      exists = await fs.existsSync(filepath)
      if (!exists) {
        fs.writeFileSync(filepath, JSON.stringify({}), {}, (err) => {console.log(err)})
      }
    }
  })
}

// 存储本地数据
const storeData = (data) => {
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

// 读取本地数据
const readData = () => {
  return new Promise((resolve, reject) => {
    fs.exists(homedir + '/code-memory/snippets.json', (exists) => {
      if (exists) {
        fs.readFile(homedir + '/code-memory/snippets.json', (err, data) => {
          if (err) reject(err)
          else resolve(JSON.parse(data.toString()))
        })
      } else {
        reject('文件不存在')
      }
    })
  })
}

// 存储设置
const storeSetting = (data) => {
  fs.exists(homedir + '/code-memory', (exists) => {
    if (!exists) {
      fs.mkdirSync(homedir + '/code-memory')
    }
    fs.writeFile(homedir + '/code-memory/setting.json', JSON.stringify(data), {}, () => {
      console.log('写入成功')
    })
  })
}

// 读取设置
const readSetting = () => {
  return new Promise((resolve, reject) => {
    fs.exists(homedir + '/code-memory/setting.json', (exists) => {
      if (exists) {
        fs.readFile(homedir + '/code-memory/setting.json', (err, data) => {
          if (err) reject(err)
          else resolve(JSON.parse(data.toString()))
        })
      } else {
        reject('文件不存在')
      }
    })
  })
}

// 存储用户
const storeUser = (data) => {
  fs.exists(homedir + '/code-memory', (exists) => {
    if (!exists) {
      fs.mkdirSync(homedir + '/code-memory')
    }
    fs.writeFile(homedir + '/code-memory/user.json', JSON.stringify(data), {}, () => {
      console.log('写入成功')
    })
  })
}

// 读取用户
const readUser = () => {
  return new Promise((resolve, reject) => {
    fs.exists(homedir + '/code-memory/user.json', (exists) => {
      if (exists) {
        fs.readFile(homedir + '/code-memory/user.json', (err, data) => {
          if (err) reject(err)
          else resolve(JSON.parse(data.toString()))
        })
      } else {
        reject('文件不存在')
      }
    })
  })
}


module.exports = {
  mkdir,
  resolveHtmlPath,
  storeData,
  readData,
  storeSetting,
  readSetting,
  storeUser,
  readUser,
}
