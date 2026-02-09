import { useMutation } from '@tanstack/react-query';
import { signup } from '../api/signup.api';
import type { SignupPayload, SignupResponse } from '../types/signup.types';

export const useSignup = () =>
  useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: signup,
  });

