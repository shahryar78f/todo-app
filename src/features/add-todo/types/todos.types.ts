import type { Todo, TodoStatus } from '@/types/todo';

export interface AddTodoPayload {
  title: string;
  description: string;
  status: TodoStatus;
}

export interface AddTodoResponse {
  status: 'success' | 'failed';
  message?: string;
}

export interface GetTodoResponse {
  status: 'success' | 'failed';
  message?: string;
  data?: { todo: Todo };
}
