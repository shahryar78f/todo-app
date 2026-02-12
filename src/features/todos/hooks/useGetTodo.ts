import { useQuery } from '@tanstack/react-query';
import { getTodo } from '../api/todos.api';
import type { GetTodoResponse } from '../types/todos.types';

export const useGetTodo = (id: string | undefined) => {
  return useQuery<GetTodoResponse, Error>({
    queryKey: ['todo', id],
    queryFn: () => getTodo(id as string),
    enabled: !!id,
  });
};
