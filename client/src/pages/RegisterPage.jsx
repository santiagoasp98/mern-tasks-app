/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message, Spin, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';

import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [messageAPI, contextHolder] = message.useMessage();

  const { signUp, isAuthenticated } = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  const handleSubmit = async (values) => {
    setLoadingRequest(true);
    try {
      await signUp(values);
      messageAPI.open({
        type: 'success',
        content: 'Registered successfully'
      })
      navigate('/tasks');
    } catch (err) {
      console.log(err.message);
      messageAPI.open({
        type: 'error',
        content: 'An error occurred. Try again later',
      });
    }
    setLoadingRequest(false);
  };

  return (
    <>
      {contextHolder}
      <Card
        title={<strong style={{ fontSize: '1.5em' }}>Register</strong>}
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
            name="registerForm"
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
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

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
                {
                  min: 3,
                  message: 'Password must be at least 3 characters long!'
                }
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
                Register
              </Button>
            </Form.Item>
          </Form>
          <p style={{ textAlign: 'right'}}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Spin>
      </Card>
    </>
  )
}

export default RegisterPage;
