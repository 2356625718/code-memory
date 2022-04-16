import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { List, Select, Input } from 'antd';
import { useStore } from 'react-redux';

import './Setting.less';

const Setting: React.FC = () => {
  const store = useStore();

  const [setting, setSetting] = useState({
    header: 0,
  });

  const data = [{
    name: '编程语言:',
    jsx: <Select defaultValue='text/javascript' style={{width: '200px'}}>
      <Select.Option value='text/javascript'>JavaScript</Select.Option>
      <Select.Option value='text/x-java'>Java</Select.Option>
      <Select.Option value='text/x-python'>Python</Select.Option>
      <Select.Option value='text/x-go'>Go</Select.Option>
      <Select.Option value='text/x-c++src'>C++</Select.Option>
    </Select>
    },
    {
      name: '开启行号:',
      jsx: <Select defaultValue='1' style={{width: '100px'}}>
      <Select.Option value='1'>是</Select.Option>
      <Select.Option value='0'>否</Select.Option>
    </Select>
    },
    {
      name: '主题:',
      jsx: <Select defaultValue='ayu-dark' style={{width: '200px'}}>
      <Select.Option value='ayu-dark'>ayu-dark</Select.Option>
      <Select.Option value='ayu-mirage'>ayu-mirage</Select.Option>
      <Select.Option value='3024-day'>3024-day</Select.Option>
      <Select.Option value='idea'>idea</Select.Option>
    </Select>
    },
    {
      name: 'Tab字符数:',
      jsx: <Input type="number" defaultValue={2} style={{width: '100px'}} min={0}></Input>
    },
    {
      name: '智能缩进:',
      jsx: <Select defaultValue='1' style={{width: '100px'}}>
      <Select.Option value='1'>是</Select.Option>
      <Select.Option value='0'>否</Select.Option>
    </Select>
    }
]

  return (
    <div className="setting-box">
      <div className="setting-header">
        <div className="setting-header-list">
          <div
            className={classNames({
              settingHeaderItem: true,
              settingHeaderItemChoosed: setting.header === 0,
            })}
            onClick={() =>
              setSetting({
                ...setting,
                header: 0,
              })
            }
          >
            editor
          </div>
          <div
            className={classNames({
              settingHeaderItem: true,
              settingHeaderItemChoosed: setting.header === 1,
            })}
            onClick={() =>
              setSetting({
                ...setting,
                header: 1,
              })
            }
          >
            community
          </div>
        </div>
      </div>
      <div className="setting-title">
        {setting.header === 0 ? 'Editor Setting' : 'Community Setting'}
      </div>
      <div className="setting-body"></div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div className='setting-body-item'>
              <div style={{marginBottom: '5px'}}>{item.name}</div>
              {item.jsx}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Setting;
