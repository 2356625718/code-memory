import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { List, Select, Input, Button, Switch } from 'antd';
import { useStore } from 'react-redux';
import color from 'ew-color-picker';
import 'ew-color-picker/dist/ew-color-picker.min.css';
import 'ew-color-picker/src/style/ew-color-picker.css';
import './Setting.less';
import { changeCurrent, changeEditor } from '@/store/action/setting';

const Setting: React.FC = () => {
  const store = useStore();
  const colorRef = useRef<any>(null);
  const stateRef = useRef<any>(null);
  let colorInstance: any;

  const [setting, setSetting] = useState({
    header: 0,
    editor: {
      mode: 'text/javascript', //模式
      lineNumbers: true, // 行号
      theme: 'ayu-dark', //主体
      tabSize: 2, // tab字符
      smartIndent: true, // 智能缩进,
      undoDepth: 200, //撤销级数,
      fontSize: 16,
      letterSpacing: 1,
      backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    current: {
      cloud: true,
      position: true,
    },
  });

  useEffect(() => {
    const storeSetting = store.getState().setting;
    const { editor, current } = storeSetting;
    setSetting({
      header: setting.header,
      ...storeSetting,
    });
    if (setting.header === 0 && colorRef.current) {
      colorInstance = new color({
        el: colorRef.current, //dom元素
        alpha: true, //打开alpha
        size: {
          width: 100,
          height: 35,
        }, //colorPicker 类型，包含 normal、medium、small、mini 四个值或您自己定义的对象，最小值为 25px
        defaultColor: editor.backgroundColor,
        sure: (color: any) => {
          console.log(color);
          setSetting({
            ...setting,
            editor: {
              ...setting.editor,
              backgroundColor: color,
            },
          });
        },
        clear: (color: any) => {
          colorInstance.updateColor('rgba(0, 0, 0, 1)');
          setSetting({
            ...setting,
            editor: {
              ...setting.editor,
              backgroundColor: 'rgba(0, 0, 0, 1)',
            },
          });
          return false;
        },
      });
    }
    return () => {
      store.dispatch(changeEditor(stateRef.current.editor));
      store.dispatch(changeCurrent(stateRef.current.current));
    };
  }, [setting.header]);

  useEffect(() => {
    stateRef.current = setting;
    const el: any = document.getElementsByClassName('ew-color-picker-box')[0];
    if (el) el.style.backgroundColor = setting.editor.backgroundColor;
  }, [setting]);

  useEffect(() => {
    return () => {
      window.utils.storeSetting({
        editor: stateRef.current.editor,
        current: stateRef.current.current,
      });
    };
  }, []);

  const data = [
    {
      name: '编程语言:',
      jsx: (
        <Select
          style={{ width: '200px' }}
          value={setting.editor.mode}
          onChange={(val: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                mode: val,
              },
            })
          }
        >
          <Select.Option value="text/javascript">JavaScript</Select.Option>
          <Select.Option value="text/x-java">Java</Select.Option>
          <Select.Option value="text/x-python">Python</Select.Option>
          <Select.Option value="text/x-go">Go</Select.Option>
          <Select.Option value="text/x-c++src">C++</Select.Option>
        </Select>
      ),
    },
    {
      name: '开启行号:',
      jsx: (
        <Select
          style={{ width: '100px' }}
          value={setting.editor.lineNumbers}
          onChange={(val: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                lineNumbers: val,
              },
            })
          }
        >
          <Select.Option value={true}>是</Select.Option>
          <Select.Option value={false}>否</Select.Option>
        </Select>
      ),
    },
    {
      name: '主题:',
      jsx: (
        <Select
          defaultValue="ayu-dark"
          style={{ width: '200px' }}
          value={setting.editor.theme}
          onChange={(val: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                theme: val,
              },
            })
          }
        >
          <Select.Option value="ayu-dark">ayu-dark</Select.Option>
          <Select.Option value="ayu-mirage">ayu-mirage</Select.Option>
          <Select.Option value="3024-day">3024-day</Select.Option>
          <Select.Option value="idea">idea</Select.Option>
        </Select>
      ),
    },
    {
      name: '制表符宽度:',
      jsx: (
        <Input
          type="number"
          value={setting.editor.tabSize}
          style={{ width: '100px' }}
          min={0}
          onChange={(e: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                tabSize: e.target.value,
              },
            })
          }
        ></Input>
      ),
    },
    {
      name: '智能缩进:',
      jsx: (
        <Select
          style={{ width: '100px' }}
          value={setting.editor.smartIndent}
          onChange={(val: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                smartIndent: val,
              },
            })
          }
        >
          <Select.Option value={true}>是</Select.Option>
          <Select.Option value={false}>否</Select.Option>
        </Select>
      ),
    },
    {
      name: '撤销级数:',
      jsx: (
        <Input
          type="number"
          value={setting.editor.undoDepth}
          style={{ width: '100px' }}
          min={0}
          onChange={(e: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                undoDepth: e.target.value,
              },
            })
          }
        ></Input>
      ),
    },
    {
      name: '字体大小:',
      jsx: (
        <Input
          type="number"
          value={setting.editor.fontSize}
          style={{ width: '100px' }}
          min={0}
          onChange={(e: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                fontSize: e.target.value,
              },
            })
          }
        ></Input>
      ),
    },
    {
      name: '字符间距:',
      jsx: (
        <Input
          type="number"
          value={setting.editor.letterSpacing}
          style={{ width: '100px' }}
          min={0}
          onChange={(e: any) =>
            setSetting({
              ...setting,
              editor: {
                ...setting.editor,
                letterSpacing: e.target.value,
              },
            })
          }
        ></Input>
      ),
    },
    {
      name: '背景颜色:',
      jsx: <div ref={colorRef}></div>,
    },
  ];

  const data2 = [
    {
      name: '自动云端存储:',
      jsx: (
        <Switch
          checkedChildren=" 是 "
          unCheckedChildren=" 否 "
          defaultChecked
          size="default"
          style={{ marginTop: '10px' }}
          checked={setting.current.cloud}
          onChange={(checked) =>
            setSetting({
              ...setting,
              current: {
                ...setting.current,
                cloud: checked,
              },
            })
          }
        ></Switch>
      ),
    },
    {
      name: '插件取用代码片段位置:',
      jsx: (
        <Switch
          checkedChildren=" 本地文件 "
          unCheckedChildren=" 云端 "
          defaultChecked
          size="default"
          checked={setting.current.position}
          style={{ marginTop: '10px' }}
          onChange={(checked) =>
            setSetting({
              ...setting,
              current: {
                ...setting.current,
                position: checked,
              },
            })
          }
        ></Switch>
      ),
    },
  ];

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
            编辑器
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
            通用
          </div>
        </div>
      </div>
      <div className="setting-title">
        {setting.header === 0 ? '编辑器设置' : '通用设置'}
      </div>
      <div className="setting-body">
        {setting.header === 0 && (
          <>
            {data.map((item: any, index: any) => {
              return (
                <div className="setting-body-item" key={index}>
                  <div style={{ marginBottom: '5px' }}>{item.name}</div>
                  {item.jsx}
                </div>
              );
            })}
            <Button
              type="primary"
              style={{ marginLeft: '100px', marginTop: '20px' }}
              onClick={() => {
                setSetting({
                  ...setting,
                  editor: {
                    mode: 'text/javascript', //模式
                    lineNumbers: true, // 行号
                    theme: 'ayu-dark', //主体
                    tabSize: 2, // tab字符
                    smartIndent: true, // 智能缩进,
                    undoDepth: 200, //撤销级数,
                    fontSize: 16,
                    letterSpacing: 1,
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                  },
                });
              }}
            >
              还原默认设置
            </Button>
          </>
        )}
        {setting.header === 1 && (
          <>
            {data2.map((item: any, index: any) => {
              return (
                <div className="setting-body-item" key={index}>
                  <div style={{ marginBottom: '5px' }}>{item.name}</div>
                  {item.jsx}
                </div>
              );
            })}
            <Button
              type="primary"
              style={{ marginLeft: '100px', marginTop: '20px' }}
              onClick={() => {
                setSetting({
                  ...setting,
                  current: {
                    cloud: true,
                    position: true,
                  },
                });
              }}
            >
              还原默认设置
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Setting;
