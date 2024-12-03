import axios from 'axios';
import { Todo } from '../types';

const API_URL = 'http://localhost:8080';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_URL}/todos`);
  return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post<Todo>(`${API_URL}/todos`, { title });
  return response.data;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_URL}/todos/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};
