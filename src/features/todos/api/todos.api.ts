import { api } from '@/utils/axios';
import type {
  AddTodoPayload,
  AddTodoResponse,
  DeleteTodoResponse,
  GetAllTodosResponse,
  GetTodoResponse,
  UpdateTodoPayload,
  UpdateTodoResponse,
  UpdateTodoStatusPayload,
  UpdateTodoStatusResponse,
} from '../types/todos.types';

export const addTodo = async (payload: AddTodoPayload): Promise<AddTodoResponse> => {
  const { data } = await api.post<AddTodoResponse>('/api/todos', payload);
  return data;
};

export const getTodo = async (id: string): Promise<GetTodoResponse> => {
  const { data } = await api.get<GetTodoResponse>(`/api/todos/${id}`);
  return data;
};

export const getAllTodos = async (): Promise<GetAllTodosResponse> => {
  const { data } = await api.get<GetAllTodosResponse>('/api/todos');
  return data;
};

export const deleteTodo = async (id: string): Promise<DeleteTodoResponse> => {
  const { data } = await api.delete<DeleteTodoResponse>(`/api/todos/${id}`);
  return data;
};

export const updateTodo = async (
  id: string,
  payload: UpdateTodoPayload,
): Promise<UpdateTodoResponse> => {
  const { data } = await api.patch<UpdateTodoResponse>(`/api/todos/${id}`, payload);
  return data;
};

export const updateTodoStatus = async (
  payload: UpdateTodoStatusPayload,
): Promise<UpdateTodoStatusResponse> => {
  const { data } = await api.patch<UpdateTodoStatusResponse>('/api/todos', payload);
  return data;
};