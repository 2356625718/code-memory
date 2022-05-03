import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useStore } from 'react-redux';
import './App.less';
import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import Page from '@/page/page';
import { setCode } from '@/store/action/code';
import { setUser } from '@/store/action/user';
import { setSetting } from '@/store/action/setting';
import codeRequest from 'request/code';

const App: React.FC = () => {
  const store = useStore();

  // 读取数据
  const readFile = async () => {
    let code: any
    let user = await window.utils.readUser()
    let setting = await window.utils.readSetting()
    // 从文件读取
    if (user.id) {
      if (setting && setting.current.position) {
        code = await window.utils.readData()
        code = code.data
      // 从服务器读取
      } else {
        code = await readDataFromServer(user.id)
      }
    } else {
      code = []
    }
    return {
      code: code ? code : null,
      user: user ? user : null,
      setting: setting ? setting : null,
    }
  };

  const readDataFromServer = async (userId: any) => {
    let res = await codeRequest.getCode({
      userId
    })
    if (res.data.status) {
      let data = res.data.data
      if (data.length) {
        data = data.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            code: item.content,
            description: item.description,
            isTitleChoosed: false,
            isChangeTitle: false
          }
        })
      }
      return data
    }
  }

  // 设置数据
  const setData = async () => {
    let { code, user, setting } = await readFile()
    if (Object.getOwnPropertyNames(code).length) store.dispatch(setCode(code))
    if (Object.getOwnPropertyNames(user).length) store.dispatch(setUser(user))
    if (Object.getOwnPropertyNames(setting).length) store.dispatch(setSetting(setting))
  }

  // 写入数据
  const writeFile = async () => {
    const { user, code, setting } = store.getState()
    if (user) await window.utils.storeUser(user)
    if (code) await window.utils.storeData(code)
    if (setting) await window.utils.storeSetting(setting)
  }

  useEffect(() => {
    // 监听右键菜单事件
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      window.electron.ipcRenderer.send('show-context-menu');
    });

    // 设置数据
    setData()

    // 监听app关闭
    window.electron.ipcOn('app-quit', () => {
      // 软件卸载时进行保存
      writeFile()
    })
  }, []);

  return (
    <Layout style={{ height: '100vh', minWidth: '720px', minHeight: '560px' }}>
      <Layout>
        <Layout.Sider width={60}>
          <Menu></Menu>
        </Layout.Sider>
        <Layout.Content>
          <Page></Page>
        </Layout.Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default App;
