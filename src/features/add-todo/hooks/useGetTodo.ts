import { useQuery } from '@tanstack/react-query';
import { getTodo } from '../api/todos.api';
import { GetTodoResponse } from '../types/todos.types';

export const useGetTodo = (id: string | undefined) => {
  return useQuery<GetTodoResponse, Error>({
    queryKey: ['todos', 'detail', id],
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('Todo ID is required'));
      }
      return getTodo(id);
    },
    enabled: !!id,
  });
};
