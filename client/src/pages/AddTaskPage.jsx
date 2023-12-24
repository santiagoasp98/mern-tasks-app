/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message, Spin, Card, DatePicker } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useState } from 'react';

import { useTasks } from '../context/TasksContext';
import { useNavigate } from 'react-router-dom';

function AddTaskPage() {
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [messageAPI, contextHolder] = message.useMessage();

  const { createTask } = useTasks();

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoadingRequest(true);
    try {
      await createTask(values);
      messageAPI.open({
        type: 'success',
        content: 'Task added'
      });
      navigate('/tasks');
    } catch (error) {
      console.log(error);
      messageAPI.open({
        type: 'error',
        content: error.response.data.errors[0],
      });
    }
    setLoadingRequest(false);
  };

  return (
    <>
      {contextHolder}
      <Card
        title={<strong style={{ fontSize: '1.5em' }}>New Task</strong>}
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
            name="addTaskForm"
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
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input a title!',
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Deadline"
              name="date"
            >
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{ textAlign: 'right' }}
            >
              <Button type="primary" htmlType="submit">
                Add Task
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </>
  )
}

export default AddTaskPage;
