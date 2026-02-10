import { api } from '@/utils/axios';
import type { AddTodoPayload, AddTodoResponse } from '../types/addTodo.types';

export const addTodo = async (payload: AddTodoPayload): Promise<AddTodoResponse> => {
  const { data } = await api.post<AddTodoResponse>('/api/todos', payload);
  return data;
};