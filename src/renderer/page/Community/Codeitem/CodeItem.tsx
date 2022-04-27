import React, { useEffect, useState } from 'react';
import {
  List,
  Avatar,
  Space,
  Modal,
  Card,
  Form,
  Input,
  Button,
  Divider,
  Comment,
} from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { useStore } from 'react-redux';
import './CodeItem.less';
import Editor from '@/components/Editor/Editor';
import communityRequest from 'request/community';

type IProps = {
  isCollect: boolean;
  changeAgain: any,
  again: boolean,
};

const CodeItem: React.FC<IProps> = ({ isCollect, again, changeAgain }) => {
  const store = useStore();

  const user = JSON.parse(sessionStorage.getItem('user') as string);
  console.log(user);
  const [list, setList] = useState([]);
  const [setting, setSetting] = useState({
    pageSize: 4,
    pageNum: 1,
    len: 0,
  });

  const [modal, setModal] = useState({
    isShow: false,
    item: {
      id: '',
      code: '',
    },
    talk: [],
    talkValue: '',
    reply: false,
    replyItem: {
      deep: 1,
      id: 1,
    },
  });

  useEffect(() => {
    getList()
    changeAgain()
  }, [again])

  const CommentWithChild = (props: any) => (
    <div className="comment-box">
      <Comment
        actions={[
          <span
            key="comment-nested-reply-to"
            onClick={() => {
              setModal({
                ...modal,
                reply: true,
                replyItem: props.data,
                talkValue: '请输入回复内容',
              });
            }}
          >
            回复
          </span>,
        ]}
        author={<a>{props.data.userInfo.userName}</a>}
        avatar={<Avatar src={props.data.userInfo.img} alt="头像" />}
        content={<p>{props.data.content}</p>}
      >
        {props.children}
      </Comment>
    </div>
  );

  const getList = async (pageNum?: number) => {
    let res: any = await communityRequest.getList({
      userId: user.id,
      pageSize: setting.pageSize,
      pageNum: pageNum || setting.pageNum,
      isCollect,
    });
    if (res.data.status) {
      let data = res.data.data;
      if (isCollect) {
        setSetting({
          pageNum: pageNum || setting.pageNum,
          pageSize: 4,
          len: data.collectArray.length,
        });
        setList(data.collectArray);
      } else {
        setSetting({
          pageNum: pageNum || setting.pageNum,
          pageSize: 4,
          len: data.list.length,
        });
        setList(data.list);
      }
    }
  };

  const getTalk = async () => {
    let res = await communityRequest.getTalk({
      id: modal.item.id,
    });
    let data = res.data;
    if (data.status) {
      setModal({
        ...modal,
        isShow: true,
        talk: data.data,
      });
    } else {
      setModal({
        ...modal,
        isShow: true,
        talk: [],
      });
    }
  };

  const putAction = async (type: number, is: boolean, codeId: number) => {
    let data: any = {
      userId: user.id,
      codeId,
    };
    if (type === 0) {
      if (is) data.good = false;
      else data.good = true;
    }
    if (type === 1) {
      if (is) data.collect = false;
      else data.collect = true;
    }
    let res = await communityRequest.putAction(data);
    if (res.data.status) {
      getList();
    }
  };

  const mapToTalk = (arr?: any) => {
    if (!Array.isArray(arr) || arr.length === 0) return;
    let res = arr.map((item: any, index: any) => (
      <CommentWithChild data={item} key={item.id}>
        {mapToTalk(item?.child)}
      </CommentWithChild>
    ));
    return res;
  };

  const IconText = (props: any) => (
    <Space>
      {React.createElement(props.icon, {
        style: {
          color: props.value ? props.color : '',
        },
        onClick: (e: any) => {
          e.stopPropagation();
          putAction(props.type, props.value, props.id);
        },
      })}
      {props.text}
    </Space>
  );

  useEffect(() => {
    getList();
    setSetting({
      ...setting,
      pageNum: 1,
    });
  }, [isCollect]);

  useEffect(() => {
    if (modal.item.id) {
      getTalk();
    }
  }, [modal.item.id]);

  const handleSubmit = async () => {
    if (!modal.talkValue.length) return;
    let data;
    if (!modal.reply) {
      data = {
        userId: user.id,
        codeId: modal.item.id,
        content: modal.talkValue,
        deep: 1,
      };
    } else {
      data = {
        userId: user.id,
        codeId: modal.item.id,
        content: modal.talkValue,
        deep: 2,
        replyToId: modal.replyItem.id,
      };
    }
    let res = await communityRequest.doTalk(data);
    if (res.data.status) {
      getTalk();
    }
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            getList(page);
          },
          pageSize: setting.pageSize,
          total: setting.len,
        }}
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item
            onClick={() => {
              setModal({
                ...modal,
                item,
              });
            }}
            className="codeListItem"
            key={item.id}
            actions={[
              <IconText
                icon={LikeOutlined}
                text={item.goodActionNumber}
                key="list-vertical-like-o"
                value={item.goodAction}
                color="red"
                id={item.id}
                type={0}
              />,
              <IconText
                icon={StarOutlined}
                text={item.collectActionNumber}
                key="list-vertical-star-o"
                value={item.collectAction}
                color="yellow"
                id={item.id}
                type={1}
              />,
              <IconText
                icon={MessageOutlined}
                text={item.talkActionNumber}
                key="list-vertical-message"
              />,
            ]}
            extra={
              <Editor
                style={{ width: '270px', height: '140px' }}
                data={item.code}
                readOnly={true}
              ></Editor>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.img} />}
              title={item.userName}
            />
            {item.description}
          </List.Item>
        )}
      />
      <Modal
        visible={modal.isShow}
        mask={true}
        title={<div style={{ height: '10px' }}>详情</div>}
        footer={null}
        width={1026}
        destroyOnClose={true}
        onCancel={() => {
          setModal({
            ...modal,
            isShow: false,
            talk: [],
            talkValue: '',
            item: { id: '', code: '' },
          });
          getList();
        }}
      >
        <div className="modal-box">
          <Editor
            style={{ width: '550px', height: '650px' }}
            data={modal.item.code}
            readOnly={true}
          ></Editor>
          <Card hoverable={true} className="talk-card">
            <div className="talk-box">{mapToTalk(modal.talk)}</div>
            <Divider></Divider>
            <div className="input-box">
              <Form.Item>
                <Input.TextArea
                  rows={4}
                  value={modal.talkValue}
                  onChange={(e: any) =>
                    setModal({
                      ...modal,
                      talkValue: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={() => handleSubmit()}
                >
                  {modal.reply ? '回复评论' : '添加评论'}
                </Button>
                {modal.reply ? (
                  <RollbackOutlined
                    style={{ marginLeft: '15px', fontSize: '20px' }}
                    onClick={() => {
                      setModal({
                        ...modal,
                        reply: false,
                        talkValue: '',
                      });
                    }}
                  />
                ) : (
                  ''
                )}
              </Form.Item>
            </div>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default CodeItem;
