import React from 'react';
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

  return (
    <>
      <div className="menu-content">
        <div className="top-area">
          <div className="menu-item">
            <Badge color="#007acc" offset={[-4, 32]} size="small">
              <Tooltip title="代码管理" placement="right">
                <SnippetsOutlined
                  className="menu-icon"
                  onClick={() => store.dispatch(changePage('/'))}
                />
              </Tooltip>
            </Badge>
          </div>
          <div className="menu-item">
            <Badge color="#007acc" offset={[-4, 32]} size="small">
              <Tooltip title="社区" placement="right">
                <SisternodeOutlined
                  className="menu-icon"
                  onClick={() => store.dispatch(changePage('/community'))}
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
                  className="menu-icon"
                  onClick={() => store.dispatch(changePage('/user'))}
                />
              </Tooltip>
            </Badge>
          </div>
          <div className={cs('menu-item', 'menu-bottom')}>
            <Badge color="#007acc" offset={[-4, 32]} size="small">
              <Tooltip title="设置" placement="right">
                <SettingOutlined
                  className="menu-icon"
                  onClick={() => store.dispatch(changePage('/setting'))}
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
