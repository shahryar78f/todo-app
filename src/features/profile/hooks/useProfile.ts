import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/profile.api';
import type { GetProfileResponse } from '../types/profile.types';
import { profileQueryKey } from '../queryKey';

export const useProfile = () => {
  return useQuery<GetProfileResponse, Error>({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  });
};

