import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodoStatus } from '../api/todos.api';
import { todoMutationKey } from '../queryKey';
import type {
  GetAllTodosResponse,
  UpdateTodoStatusPayload,
  UpdateTodoStatusResponse,
} from '../types/todos.types';

export const useUpdateTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTodoStatusResponse, Error, UpdateTodoStatusPayload>({
    mutationFn: updateTodoStatus,
    mutationKey: todoMutationKey,
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<GetAllTodosResponse | undefined>(todoMutationKey, old => {
        if (!old || old.status === 'failed') return old;

        const prev = old.data.todos as Record<string, any[]>;

        let movedTodo: any | null = null;
        for (const k in prev) {
          const found = prev[k].find(t => t._id === variables.id);
          if (found) {
            movedTodo = { ...found, status: variables.status };
            break;
          }
        }

        const newTodos: Record<string, any[]> = {};
        for (const k in prev) {
          newTodos[k] = prev[k].filter(t => t._id !== variables.id);
        }

        if (movedTodo) {
          const key = variables.status as string;
          newTodos[key] = [movedTodo, ...(newTodos[key] ?? [])];
        }

        return { ...old, data: { todos: newTodos } };
      });

      queryClient.invalidateQueries({ queryKey: todoMutationKey });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
