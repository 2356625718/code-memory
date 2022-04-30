import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Row, Col, notification } from 'antd';
import { useStore } from 'react-redux';
import { Footer } from 'antd/lib/layout/layout';
import './Login.less';
import userRequest from 'request/user';
import { setUser } from '@/store/action/user';
import _ from 'lodash';

type Iprops = {
  changePage: Function;
};

const { TabPane } = Tabs;


const Login: React.FC<Iprops> = ({ changePage }) => {
  const [loading, setLoading] = useState({
    loading1: false, // loading中
  });

  const store = useStore();

  // 提交表单
  const onFinish = async (values: any) => {
    setLoading({
      ...loading,
      loading1: true,
    });
    let res = await userRequest.login({
      userNameOrPhone: values.username,
      password: values.password,
    });
    if (res.data.status) {
      notification.success({
        message: '登录成功',
      });
      store.dispatch(setUser(res.data.data));
      localStorage.setItem('user', JSON.stringify(_.cloneDeep(res.data.data)));
      setLoading({
        ...loading,
        loading1: false,
      });
      changePage('user');
    } else {
      notification.error({
        message: res.data.data || '登录失败',
      });
      setLoading({
        ...loading,
        loading1: false,
      });
    }
  };

  return (
    <div className="bg">
      <div className="heard">
        <h1 className="title">登录</h1>
      </div>
      <div className="login_card">
        <Tabs
          type="card"
          defaultActiveKey="1"
          centered
          style={{ margin: '40px auto' }}
        >
          <TabPane tab="账户密码登录" key="1">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入手机号 / 用户名!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
              >
                <Input placeholder="请输入手机号 / 用户名" bordered={false} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
              >
                <Input
                  bordered={false}
                  type="password"
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item>
                <a
                  style={{ color: '#8C8D9B' }}
                  onClick={() => changePage('register')}
                >
                  创建账号
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: '56PX', borderRadius: '12PX' }}
                  disabled={loading.loading1}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
      <Footer className="footer">欢迎使用"代码记忆"</Footer>
    </div>
  );
};

export default Login;
