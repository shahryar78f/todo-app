export type TodoStatus = 'todo' | 'inProgress' | 'review' | 'done';

export interface Todo {
  _id: string;
  title: string;
  status: TodoStatus;
  description: string;
  createdAt?: string;
}

export type SortedTodos = Record<TodoStatus, Todo[]>;
