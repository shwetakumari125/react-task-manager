import axios from "axios";

const BASE_URL = 'http://localhost:3001';

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(`${BASE_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (task) => {
  console.log('API updateTask:', { taskId: task.id, task });
  const response = await axios.put(`${BASE_URL}/tasks/${task.id}`, task);
  console.log('API response:', response.data);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  return taskId;
};
