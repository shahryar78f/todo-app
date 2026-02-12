import { useMutation } from '@tanstack/react-query';
import { addTodo } from '../api/todos.api';
import { todoMutationKey } from '../queryKey';
import type { AddTodoPayload, AddTodoResponse } from '../types/todos.types';

export const useAddTodo = () => {
  return useMutation<AddTodoResponse, Error, AddTodoPayload>({
    mutationFn: addTodo,
    mutationKey: todoMutationKey,
  });
};

