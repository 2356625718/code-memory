import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined, FormOutlined, CloseOutlined } from '@ant-design/icons';
import { Row, Col, Tooltip, Input } from 'antd';
import { useStore } from 'react-redux';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { setCode } from '@/store/action/code';
import {} from 'antd';
import './Index.less';
import Editor from '@/components/Editor/Editor';
import codeRequest from 'request/code';

const Index: React.FC = () => {
  const store = useStore();
  const user = JSON.parse(sessionStorage.getItem('user') as string)
  const [data, setData] = useState<Code[]>([]);
  const dataRef = useRef(null)

  const keyDown = (e: any, index: any) => {
    let code = e.keyCode;
    if (code === 32) e.preventDefault();
    if (code === 13) {
      let clone = _.cloneDeep(data);
      clone[index].title = e.target.value;
      clone[index].ischangeTitle = false;
      setData(clone);
    }
  };

  const storeData = async () => {
    let res = await codeRequest.addCode({
      userId: user.id,
      codes: dataRef.current
    })
    if (res) {
      console.log(res)
    }
  }

  useEffect(() => {
    console.log(store.getState())
    const startData = store.getState().code;
    if (startData.length) startData[0].isTitleChoosed = true
    setData(startData);
    return () => {
      store.dispatch(setCode(data));
      storeData()
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    dataRef.current = data
  }, [data])

  return (
    <Row className="index-content">
      <Col span={4}>
        <div className="title-content">
          <div className="title-header">
            <span>标题</span>
            <Tooltip title="新增" placement="right">
              <PlusOutlined
                onClick={() => {
                  let clone = _.cloneDeep(data);
                  clone.forEach((item: any, index: any) => {
                    clone[index].isTitleChoosed = false
                  })
                  clone.push({
                    id: uuidv4(),
                    title: '未命名',
                    code: '',
                    isTitleChoosed: true,
                    ischangeTitle: false,
                  });
                  setData(clone);
                }}
                className="add-title"
              />
            </Tooltip>
          </div>
          <div className='title-list'>
            {data.map((item: any, index: any) => (
              <div
                key={item.id}
                className={classNames({
                  choosed: item.isTitleChoosed,
                  titleItem: true,
                })}
                onClick={() => {
                  let clone = _.cloneDeep(data);
                  clone.forEach((item: any, index: any) => {
                    clone[index].isTitleChoosed = false;
                  });
                  clone[index].isTitleChoosed = true;
                  setData(clone);
                }}
              >
                {item?.ischangeTitle ? (
                  <Input
                    type="text"
                    defaultValue={item.title}
                    className="titleInput"
                    onKeyDown={(e) => keyDown(e, index)}
                    bordered={false}
                  ></Input>
                ) : (
                  <span>{item.title}</span>
                )}
                <div className="icons">
                  <FormOutlined
                    className="icon"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      let clone = _.cloneDeep(data);
                      clone.forEach((item: any, index: any) => {
                        if (item?.ischangeTitle) {
                          clone[index].ischangeTitle = false
                        }
                      })
                      if (clone[index]?.ischangeTitle) {
                        clone[index].ischangeTitle =
                          !clone[index]?.ischangeTitle;
                      } else {
                        clone[index].ischangeTitle = true;
                      }
                      setData(clone);
                    }}
                  />
                  <CloseOutlined
                    className="icon"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      let clone = _.cloneDeep(data).filter(
                        (item2: any, index2: any) => index2 !== index
                      );
                      setData(clone);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col span={20} className="content-box">
        {
          data.length ? <Editor data={data.find((item: any) => item.isTitleChoosed)?.code} changeCode = {(str: string) => {
            let clone = _.cloneDeep(data)
            clone[clone.findIndex((item: any) => item.isTitleChoosed)].code = str
            setData(clone)
          }}></Editor> : <span style={{fontSize: '35px', color: 'white'}}>请先创建标题</span>
        }
      </Col>
    </Row>
  );
};

export default Index;
