import { z } from 'zod';

export const addTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'The title should not be longer than 20 characters.'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(5, 'Description must be at least 5 characters'),
  status: z.enum(['todo', 'inProgress', 'review', 'done']),
});

export type AddTodoFormData = z.infer<typeof addTodoSchema>;

