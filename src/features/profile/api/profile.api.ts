import { api } from '@/utils/axios';
import type {
  CreateProfilePayload,
  GetProfileResponse,
  ProfileMutationResponse,
  UpdateProfilePayload,
} from '../types/profile.types';

export const getProfile = async (): Promise<GetProfileResponse> => {
  const { data } = await api.get<GetProfileResponse>('/api/profile');
  return data;
};

export const createProfile = async (
  payload: CreateProfilePayload,
): Promise<ProfileMutationResponse> => {
  try {
    const { data } = await api.post<ProfileMutationResponse>('/api/profile', payload);
    return data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<ProfileMutationResponse> => {
  try {
    const { data } = await api.put<ProfileMutationResponse>('/api/profile', payload);
    return data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
