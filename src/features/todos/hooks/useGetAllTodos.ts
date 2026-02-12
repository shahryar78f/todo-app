import { useQuery } from '@tanstack/react-query';
import { getAllTodos } from '../api/todos.api';
import { todoMutationKey } from '../queryKey';
import { GetAllTodosResponse } from '../types/todos.types';

export const useGetAllTodos = () => {
  return useQuery<GetAllTodosResponse, Error>({
    queryKey: todoMutationKey,
    queryFn: getAllTodos,
  });
};
