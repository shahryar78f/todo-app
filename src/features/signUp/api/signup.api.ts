import { api } from '@/utils/axios';
import type { SignupPayload, SignupResponse } from '../types/signup.types';

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  try {
    const { data } = await api.post<SignupResponse>('/api/auth/signup', payload);
    return data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

