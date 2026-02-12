import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todos.api';
import type { UpdateTodoPayload, UpdateTodoResponse } from '../types/todos.types';
import { todoMutationKey } from '../queryKey';

type Variables = { id: string } & UpdateTodoPayload;

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTodoResponse, Error, Variables>({
    mutationFn: ({ id, ...payload }) => updateTodo(id, payload),
    mutationKey: todoMutationKey,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: todoMutationKey });
      queryClient.invalidateQueries({ queryKey: ['todo', variables.id] });
    },
  });
};

