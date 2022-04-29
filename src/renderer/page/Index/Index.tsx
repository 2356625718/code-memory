import React, { useState, useEffect, useRef } from 'react';
import {
  PlusOutlined,
  FormOutlined,
  CloseOutlined,
  CopyOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Row, Col, Tooltip, Input, Modal, Button } from 'antd';
import { useStore } from 'react-redux';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { setCode } from '@/store/action/code';
import {} from 'antd';
import './Index.less';
import Editor from '@/components/Editor/Editor';
import codeRequest from 'request/code';

const code = 'const a = 0;';

const Index: React.FC = () => {
  const store = useStore();
  const user = JSON.parse(sessionStorage.getItem('user') as string);
  const [data, setData] = useState<Code[]>([]);
  const [controller, setController] = useState({
    isShowDescription: false,
    description: '',
  });
  const dataRef = useRef(null);

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

  const storeDataAtServer = async () => {
    let res = await codeRequest.addCode({
      userId: user.id,
      codes: dataRef.current,
    });
    if (res.data.status) {
      console.log(res);
    }
  };

  useEffect(() => {
    // @ts-ignore
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const startData = store.getState().code;
    if (startData?.length) {
      let isChoosed = startData.some((item: any) => {
        return item?.isTitleChoosed;
      });
      if (!isChoosed) startData[0].isTitleChoosed = true;
    }
    setData(startData);
    return () => {
      store.dispatch(setCode(dataRef.current));
      storeDataAtServer();
      let storeData;
      // @ts-ignore
      if (dataRef.current && dataRef.current.length) {
        // @ts-ignore
        storeData = dataRef.current.map((item: any) => {
          return {
            prefix: item.title,
            body: item.code,
            description: item.description,
          };
        });
      }
      window.utils.storeDataAtLocal(storeData);
    };
  }, []);

  return (
    <>
      <Row className="index-content">
        <Col span={4}>
          <div className="title-content">
            <div className="title-header">
              <span>标题</span>
              <Tooltip title="新增" placement="right">
                <PlusOutlined
                  onClick={() => {
                    let clone = _.cloneDeep(data);
                    if (clone.length) {
                      clone.forEach((item: any, index: any) => {
                        clone[index].isTitleChoosed = false;
                      });
                    }
                    clone.unshift({
                      id: uuidv4(),
                      title: '未命名',
                      code: '',
                      description: '',
                      isTitleChoosed: true,
                      ischangeTitle: false,
                    });
                    setData(clone);
                  }}
                  className="add-title"
                />
              </Tooltip>
            </div>
            <div className="title-list">
              {data.length &&
                data.map((item: any, index: any) => (
                  <div
                    key={item.id}
                    className={classNames({
                      choosed: item.isTitleChoosed,
                      titleItem: true,
                    })}
                    onClick={() => {
                      let clone: any = _.cloneDeep(dataRef.current);
                      if (clone?.length) {
                        clone.forEach((item: any, index: any) => {
                          clone[index].isTitleChoosed = false;
                        });
                      }
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
                          if (clone.length) {
                            clone.forEach((item: any, index: any) => {
                              if (item?.ischangeTitle) {
                                clone[index].ischangeTitle = false;
                              }
                            });
                          }
                          if (clone[index]?.ischangeTitle) {
                            clone[index].ischangeTitle =
                              !clone[index]?.ischangeTitle;
                          } else {
                            clone[index].ischangeTitle = true;
                          }
                          setData(clone);
                        }}
                      />
                      <ProfileOutlined
                        className="icon"
                        onClick={() => {
                          setController({
                            ...controller,
                            isShowDescription: true,
                            description: item?.description?.length
                              ? item.description
                              : '',
                          });
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
          {data.length ? (
            <Editor
            //@ts-ignore
              data={data?.find((item: any) => item.isTitleChoosed)?.code}
              id = {data?.find((item: any) => item.isTitleChoosed)?.id}
              changeCode={(str: any) => {
                let clone: any = _.cloneDeep(dataRef.current);
                clone[clone.findIndex((item: any) => item.isTitleChoosed)].code = str;
                setData(clone);
              }}
            ></Editor>
          ) : (
            <span style={{ fontSize: '35px', color: 'white' }}>
              请先创建标题
            </span>
          )}
        </Col>
        {data.length && (
          <div className="tool-box">
            <CopyOutlined
              className="tool-item"
              onClick={() =>
                navigator.clipboard.writeText(
                  data.find((item: any) => item.isTitleChoosed)?.code as string
                )
              }
            />
          </div>
        )}
      </Row>
      <Modal
        title="简介(代码智能提示时显示)"
        visible={controller.isShowDescription}
        onCancel={() =>
          setController({ ...controller, isShowDescription: false })
        }
        footer={
          <Button
            type="primary"
            onClick={() => {
              let clone = _.cloneDeep(data);
              if (clone.length) {
                clone.forEach((item: any, index: any) => {
                  if (item.isTitleChoosed)
                    clone[index].description = controller.description;
                });
              }
              setData(clone);
              setController({
                isShowDescription: false,
                description: '',
              });
            }}
          >
            提交
          </Button>
        }
      >
        <Input.TextArea
          rows={4}
          value={controller.description}
          onChange={(e: any) => {
            setController({ ...controller, description: e.target.value });
          }}
        ></Input.TextArea>
      </Modal>
    </>
  );
};

export default Index;
