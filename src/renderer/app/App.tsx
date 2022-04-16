import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useStore } from 'react-redux';
import './App.less';
import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import Page from '@/page/page';
import { setCode } from '@/store/action/code';
const App: React.FC = () => {
  const store = useStore();

  useEffect(() => {
    if (!localStorage.getItem('data')) {
      let data = {
        codes: [
          {
            id: '1',
            title: '未命名',
            code: '',
            isTitleChoosed: true,
            isTitleHoverd: false,
            ischangeTitle: false,
          },
        ],
        isChanging: {
          id: '1',
          title: '未命名',
          code: '',
          isTitleChoosed: true,
          isTitleHoverd: false,
          ischangeTitle: false,
        },
      }
      localStorage.setItem(
        'data',
        JSON.stringify(data)
      );
      store.dispatch(setCode(data));
    } else {
      let data = JSON.parse(localStorage.getItem('data') as string);
      store.dispatch(setCode(data));
    }
    return () => {
      let data = store.getState().code
      localStorage.setItem('data', JSON.stringify(data))
    }
  }, [])

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
