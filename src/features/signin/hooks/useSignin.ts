import { useMutation } from '@tanstack/react-query';
import { signin } from '../api/signin.api';
import type { SigninPayload, SigninResponse } from '../types/signin.types';

export const useSignin = () => {
  return useMutation<SigninResponse, Error, SigninPayload>({
    mutationFn: signin,
  });
};
