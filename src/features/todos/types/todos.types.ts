import type { Todo, TodoStatus } from '@/types/todo';

export interface AddTodoPayload {
  title: string;
  description: string;
  status: TodoStatus;
}

export interface AddTodoResponse {
  status: 'success' | 'failed';
  message?: string;
  data?: { todo: Todo };
}

export interface GetTodoResponse {
  status: 'success' | 'failed';
  message?: string;
  data?: { todo: Todo };
}

export type GetAllTodosResponse = {
  status: 'success' | 'failed';
  data: {
    todos: Record<string, Todo[]>;
  };
};

export interface DeleteTodoResponse {
  status: 'success' | 'failed';
  message?: string;
}

export interface UpdateTodoPayload {
  title: string;
  description: string;
}

export interface UpdateTodoResponse {
  status: 'success' | 'failed';
  message?: string;
}