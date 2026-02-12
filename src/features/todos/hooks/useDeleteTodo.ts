import { deleteTodo } from '../api/todos.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DeleteTodoResponse } from '../types/todos.types';
import { todoMutationKey } from '../queryKey';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTodoResponse, Error, string>({
    mutationFn: deleteTodo,
    mutationKey: todoMutationKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoMutationKey });
    },
  });
};