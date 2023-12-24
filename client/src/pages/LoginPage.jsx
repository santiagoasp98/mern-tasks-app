/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message, Spin, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [messageAPI, contextHolder] = message.useMessage();

  const { signIn, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  const handleSubmit = async (values) => {
    setLoadingRequest(true);
    try {
      await signIn(values);
      messageAPI.open({
        type: 'success',
        content: 'Logged successfully'
      })
      navigate('/tasks');
    } catch (error) {
      if (error.response.data.message) {
        console.log(error.response.data.message);
        messageAPI.open({
          type: 'error',
          content: error.response.data.message,
        });
      } else {
        console.log(error);
        messageAPI.open({
          type: 'error',
          content: error.response.data.errors[0],
        })
      }
    }
    setLoadingRequest(false);
  };

  return (
    <>
      {contextHolder}
      <Card
        title={<strong style={{ fontSize: '1.5em' }}>Login</strong>}
        bordered={true}
        style={{
          width: 600,
        }}          
      >
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          spinning={loadingRequest}
        >
          <Form
            name="loginForm"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              width: '100%',
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{ textAlign: 'right' }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <p style={{ textAlign: 'right'}}>
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Spin>
      </Card>
    </>
  )
}

export default LoginPage;
