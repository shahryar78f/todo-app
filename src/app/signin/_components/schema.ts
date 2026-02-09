import { z } from 'zod';

export const signinSchema = z.object({
  email: z.email('Please enter a valid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(5, 'Password must be at least 5 characters'),
});

export type SigninFormData = z.infer<typeof signinSchema>;
