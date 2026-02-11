import { api } from '@/utils/axios';
import type { AddTodoPayload, AddTodoResponse, GetTodoResponse } from '../types/todos.types';

export const addTodo = async (payload: AddTodoPayload): Promise<AddTodoResponse> => {
  const { data } = await api.post<AddTodoResponse>('/api/todos', payload);
  return data;
};

export const getTodo = async (id: string): Promise<GetTodoResponse> => {
  const { data } = await api.get<GetTodoResponse>(`/api/todos/${id}`);
  return data;
};
