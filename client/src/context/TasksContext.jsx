/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

import { 
  createTaskRequest,
  getTasksRequest,
  updateTaskRequest,
  deleteTaskRequest
} from "../api/tasks";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    await createTaskRequest(task);
  };

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const updateTask = async (updatedTask) => {
    const { id, ...values } = updatedTask;
    await updateTaskRequest(id, values);
  };

  const deleteTask = async (taskId) => {
    await deleteTaskRequest(taskId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
};
