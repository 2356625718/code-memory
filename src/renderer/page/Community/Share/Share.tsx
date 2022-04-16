import React, { useEffect, useState } from 'react';
import { Select, Form, Input, Button } from 'antd';
import { useStore } from 'react-redux';
import codeRequest from 'request/code';
import communityRequest from 'request/community';

import './Share.less';

const Share: React.FC = () => {
  const store = useStore();
  const user = store.getState().user;

  const [data, setData] = useState({
    item: '',
    introduce: '',
    list: [],
  });

  const getCode = async () => {
    console.log(user);
    let res = await codeRequest.getCode({
      userId: user.id,
    });
    if (res.data.status) {
      setData({
        ...data,
        list: res.data.data,
      });
    }
  };

  const handleSubmit = () => {
    console.log(data)
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div>
      <Form.Item label="标题名">
        <Select
          onChange={(val) => {
            setData({
              ...data,
              item: val,
            });
          }}
        >
          {data.list.map((item: any, index: number) => (
            <Select.Option value={item} key={index}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="简介">
        <Input.TextArea rows={5} value={data.introduce} onChange={(e:any) => setData({
          ...data,
          introduce: e.target.value
        })}></Input.TextArea>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" onClick={() => handleSubmit()}>
          我要分享
        </Button>
      </Form.Item>
    </div>
  );
};

export default Share;
