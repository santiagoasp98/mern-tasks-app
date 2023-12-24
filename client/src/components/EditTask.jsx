/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";

import dayjs from 'dayjs';

function EditTask(props) {
  const { 
    visible,
    setEditing,
    handleEdit, 
    task,
    refetch
  } = props;

  if (!task) return null;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(dayjs(task.date));
  const id = task._id;

  return (
    <Modal
      title='Edit task'
      open={visible}
      onCancel={() => setEditing(false)}
      footer={[
        <Button key='cancel' onClick={() => setEditing(false)}>
          Cancel
        </Button>,
        <Button
          key='submit' 
          type='primary' 
          onClick={() => {
            setEditing(false);
            handleEdit({id, title, description, date});
            refetch();
          }}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        name="editTaskForm"
        initialValues={{title, description, date}}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          width: '100%',
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />
        </Form.Item>

        <Form.Item
          label="Deadline"
          name="date"
        >
          <DatePicker
            value={date}
            onChange={(value) => setDate(value)}
            style={{ width: '100%' }} format="DD/MM/YYYY"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditTask;
