import { signIn } from 'next-auth/react';
import type { SigninPayload, SigninResponse } from '../types/signin.types';

export const signin = async (payload: SigninPayload): Promise<SigninResponse> => {
  const res = await signIn('credentials', { ...payload, redirect: false });

  if (res?.error) {
    return { status: 'failed', message: res.error };
  }

  return { status: 'success' };
};