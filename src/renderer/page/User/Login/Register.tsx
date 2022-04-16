import React, { useState } from 'react'
import { Form, Input, Button, notification } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import './Register.less';
import userRequest from 'request/user'


type Iprops = {
  changePage: Function
}



const Register: React.FC<Iprops> = ({ changePage }) => {
  const [loading, setLoading] = useState({
    loading1: false
  })

  const onFinish = async (values: any) => {
    setLoading({
      loading1: true
    })
    console.log('Received values of form: ', values);
    const { userName, phone, password, password2 } = values
    if (password === password2) {
      let res = await userRequest.register({
        userName,
        phone,
        password
      })
      if (res.data.status) {
        notification.success({
          message: "注册成功"
        })
        setLoading({
          loading1: false
        })
        changePage('login')
      } else {
        notification.error({
          message: res.data.data || '注册失败'
        })
        setLoading({
          loading1: false
        })
      }
    } else {
      notification.error({
        message: "两次密码输入不一致！"
      })
      setLoading({
        loading1: false
      })
    }
  };

  return (
    <div className="bg">
      <div className="heard">
        <h1 className="title">注册</h1>
      </div>
      <div className="login_card">
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: '请输入用户名!' }]}
            style={{ borderBottom: '1px solid #DCDCDC' }}
          >
            <Input placeholder="请输入用户名" bordered={false} />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: '请输入手机号!' }]}
            style={{ borderBottom: '1px solid #DCDCDC' }}
          >
            <Input placeholder="请输入手机号" bordered={false} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请设置密码!' }]}
            style={{ borderBottom: '1px solid #DCDCDC' }}
          >
            <Input
              bordered={false}
              type="password"
              placeholder="请设置密码"
            />
          </Form.Item>
          <Form.Item
            name="password2"
            rules={[{ required: true, message: '请重复密码!' }]}
            style={{ borderBottom: '1px solid #DCDCDC' }}
          >
            <Input
              bordered={false}
              type="password"
              placeholder="请重复密码"
            />
          </Form.Item>

          <Form.Item>
            已有帐号，<a href="#" onClick={() => changePage('login')}>点击登录</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ height: '56PX', borderRadius: '12PX' }} disabled={loading.loading1}>
              注册
            </Button>
          </Form.Item>

        </Form>
      </div>

      <Footer className="footer">
          欢迎使用"代码记忆"
      </Footer>
    </div>
  );
}

export default Register;
