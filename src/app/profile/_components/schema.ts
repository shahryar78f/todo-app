import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  password: z
    .string()
    .min(0)
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

