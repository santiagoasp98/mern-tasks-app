/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import { Spin, message, Card, Row, Col, Popconfirm, Button, Tooltip } from "antd";
import { LoadingOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined, CalendarOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import moment from 'moment';
import EditTask from "../components/EditTask";

function TasksPage() {
  const { tasks, getTasks, updateTask, deleteTask } = useTasks();

  const [loadingTasks, setLoadingTasks] = useState(false);
  const [editing, setEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [messageAPI, contextHolder] = message.useMessage();

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      await getTasks();
    } catch (error) {
      console.log(error);
      messageAPI.open({
        type: 'error',
        content: error.response.data.errors[0],
      });
    }
    setLoadingTasks(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = async (values) => {
    setLoadingTasks(true);
    try {
      await updateTask(values);
      messageAPI.open({
        type: 'success',
        content: 'Task edited',
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        messageAPI.open({
          type: 'error',
          content: error.response.data.message,
        });
      } else {
        messageAPI.open({
          type: 'error',
          content: error.response.data.errors[0],
        });
      }
    }
    setLoadingTasks(false);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      messageAPI.open({
        type: 'success',
        content: 'Task deleted',
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        messageAPI.open({
          type: 'error',
          content: error.response.data.message,
        });
      } else {
        messageAPI.open({
          type: 'error',
          content: error.response.data.errors[0],
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Spin 
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        spinning={loadingTasks}
        style={{ width: '80%', height: '80%' }}
      >
        <Card
          title={<strong style={{ fontSize: '1.5em' }}>My Tasks</strong>}
          bordered={true}
          style={{
            height: '100%',
            margin: 16,
            overflow: 'auto'
          }}
          extra={
            <Link to="/tasks/new">
              <Tooltip title='Add a new task'>
                <PlusCircleOutlined style={{ color: 'black', fontSize: '20px' }} />
              </Tooltip>
            </Link>
          }
        >
          <Row gutter={16} style={{ marginLeft: '16px', marginRight: '16px' }}>
            {tasks.length === 0 ? (
              <Card bordered={true}>
                <p>You have no tasks</p>
                <Link to="/tasks/new">Add a task</Link>
              </Card>
            ) : (
              tasks.map(task => (
                <Col
                  key={task._id}
                  span={24 / 5}
                  style={{ marginBottom: '16px' }}
                >
                  <Card 
                    title={
                      <Tooltip title={task.title} placement='topLeft'>
                        {task.title}
                      </Tooltip>
                    }
                    bordered={true}
                    style={{
                      width: 300,
                    }}
                    extra={
                      <div>
                        <Button
                          type='primary'
                          onClick={() => {
                            setEditing(true);
                            setTaskToEdit(task);
                          }}
                          size='small'
                          icon={<EditOutlined style={{ color: 'black' }} />}
                          style={{ backgroundColor: 'white', border: 'none' }}
                        />
                        <Popconfirm
                          title='Are you sure to delete this task?'
                          onConfirm={() => handleDelete(task._id)}
                          okText='Yes'
                          cancelText='No'
                          placement='topRight'
                        >
                          <Button
                            type='primary'
                            size='small'
                            icon={<DeleteOutlined style={{ color: 'black' }} />}
                            style={{ backgroundColor: 'white', border: 'none', marginLeft: 5 }}
                          />
                        </Popconfirm>
                      </div>
                    }
                  >
                    <p>{task.description}</p>
                    <p><CalendarOutlined />  {moment(task.date).format('DD/MM/YYYY')}</p>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Card>
        <EditTask
          visible={editing}
          setEditing={setEditing}
          handleEdit={handleEdit}
          task={taskToEdit}
          refetch={fetchTasks}
        />
      </Spin>
    </>
  )
}

export default TasksPage;
