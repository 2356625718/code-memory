import React, { useEffect, useState } from 'react';
import { Select, Form, Input, Button, message } from 'antd';
import { useStore } from 'react-redux';
import codeRequest from 'request/code';
import communityRequest from 'request/community';

import './Share.less';

type Iprops = {
  changeAgain: any,
}

const Share: React.FC<Iprops> = (props) => {
  const store = useStore();
  const user = JSON.parse(localStorage.getItem('user') as string);

  const [data, setData] = useState({
    item: {
      content: '',
    },
    introduce: '',
    list: [],
  });

  const getCode = async () => {
    console.log(user);
    let res = await codeRequest.getCode({
      userId: user.id,
    });
    if (res.data.status) {
      console.log(res.data.data);
      setData({
        ...data,
        list: res.data.data,
      });
    }
  };

  const handleSubmit = async () => {
    console.log(data);
    let res = await communityRequest.shareCode({
      userId: user.id,
      description: data.introduce,
      code: data.item.content
    })
    if (res.data.status) {
      message.success('分享成功')
      props.changeAgain()
    }
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div>
      <Form.Item label="标题名">
        <Select
          onChange={(val) => {
            let item = data.list[val]
            setData({
              ...data,
              item,
            });
          }}
        >
          {data.list.map((item: any, index: number) => (
            <Select.Option value={index} key={index}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="简介">
        <Input.TextArea
          rows={5}
          value={data.introduce}
          onChange={(e: any) =>
            setData({
              ...data,
              introduce: e.target.value,
            })
          }
        ></Input.TextArea>
      </Form.Item>
      <Form.Item style={{marginLeft: '65%'}}>
        <Button htmlType="submit" type="primary" onClick={() => handleSubmit()}>
          我要分享
        </Button>
      </Form.Item>
    </div>
  );
};

export default Share;
