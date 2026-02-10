import type { TodoStatus } from '@/types/todo';

export interface AddTodoPayload {
  title: string;
  description: string;
  status: TodoStatus;
}

export interface AddTodoResponse {
  status: 'success' | 'failed';
  message?: string;
}
