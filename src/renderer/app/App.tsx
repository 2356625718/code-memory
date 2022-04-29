import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'react-redux';
import './App.less';
import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import Page from '@/page/page';
import { setCode } from '@/store/action/code';
const App: React.FC = () => {
  const store = useStore();

  useEffect(() => {
    console.log(window.electron)
    // renderer
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      window.electron.ipcRenderer.send('show-context-menu');
    });

    // window.electron.ipcOn('context-menu-command', (e: any, command: any) => {
    //   console.log(command)
    // });
    if (!localStorage.getItem('data')) {
      let data = {
        codes: [
          {
            id: uuidv4(),
            title: '未命名',
            code: '',
            description: '',
            isTitleChoosed: true,
            ischangeTitle: false,
          },
        ],
      };
      localStorage.setItem('data', JSON.stringify(data));
      store.dispatch(setCode(data.codes));
    } else {
      let data = JSON.parse(localStorage.getItem('data') as string);
      store.dispatch(setCode(data.codes));
    }
    return () => {
      let data = store.getState().code;
      if (data.length) {
        localStorage.setItem(
          'data',
          JSON.stringify({
            codes: data,
          })
        );
      }
    };
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
