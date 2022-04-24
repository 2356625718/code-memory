import React, { useState } from 'react';
import { Tooltip, Badge } from 'antd';
import {
  SnippetsOutlined,
  SisternodeOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import cs from 'classnames';
import { useStore } from 'react-redux';
import './Menu.less';
import { changePage } from '@/store/action/page';

const Menu: React.FC = () => {
  const store = useStore();

  const [choosed, setChoosed] = useState(3)
  return (
    <>
      <div className="menu-content">
        <div className="top-area">
          <div className="menu-item">
            <Badge color="#007acc" offset={[-4, 32]} size="small">
              <Tooltip title="代码管理" placement="right">
                <SnippetsOutlined
                  className={cs({
                    menuIcon: true,
                    menuChoosed: choosed === 1
                  })}
                  onClick={() => {store.dispatch(changePage('/'));setChoosed(1)}}
                />
              </Tooltip>
            </Badge>
          </div>
          <div className="menu-item">
            <Badge color="#007acc" offset={[-4, 32]} size="small">
              <Tooltip title="社区" placement="right">
                <SisternodeOutlined
                  className={cs({
                    menuIcon: true,
                    menuChoosed: choosed === 2
                  })}
                  onClick={() => {store.dispatch(changePage('/community'));setChoosed(2)}}
                />
              </Tooltip>
            </Badge>
          </div>
        </div>
        <div className="bottom-area">
          <div className={cs('menu-item', 'menu-bottom')}>
            <Badge color="#007acc" offset={[-4, 32]} size="small">
              <Tooltip title="账户" placement="right">
                <UserOutlined
                  className={cs({
                    menuIcon: true,
                    menuChoosed: choosed === 3
                  })}
                  onClick={() => {store.dispatch(changePage('/user'));setChoosed(3)}}
                />
              </Tooltip>
            </Badge>
          </div>
          <div className={cs('menu-item', 'menu-bottom')}>
            <Badge color="#007acc" offset={[-4, 32]} size="small">
              <Tooltip title="设置" placement="right">
                <SettingOutlined
                  className={cs({
                    menuIcon: true,
                    menuChoosed: choosed === 4
                  })}
                  onClick={() => {store.dispatch(changePage('/setting'));setChoosed(4)}}
                />
              </Tooltip>
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
