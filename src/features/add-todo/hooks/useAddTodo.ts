import { useMutation } from '@tanstack/react-query';
import { addTodo } from '../api/addTodo.api';
import type { AddTodoPayload, AddTodoResponse } from '../types/addTodo.types';
import { addTodoMutationKey } from '../queryKey';

export const useAddTodo = () => {
  return useMutation<AddTodoResponse, Error, AddTodoPayload>({
    mutationFn: addTodo,
    mutationKey: addTodoMutationKey,
  });
};

