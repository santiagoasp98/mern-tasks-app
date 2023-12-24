import axiosInstance from './axios'

export const createTaskRequest = (task) => axiosInstance.post('/tasks', task);

export const getTasksRequest = () => axiosInstance.get('/tasks');

export const updateTaskRequest = (taskId, updatedTask) => axiosInstance.put(`/tasks/${taskId}`, updatedTask);

export const deleteTaskRequest = (taskId) => axiosInstance.delete(`/tasks/${taskId}`);
