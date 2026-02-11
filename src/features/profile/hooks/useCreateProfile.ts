import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfile } from '../api/profile.api';
import type { CreateProfilePayload, ProfileMutationResponse } from '../types/profile.types';
import { profileCreateMutationKey, profileQueryKey } from '../queryKey';

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<ProfileMutationResponse, Error, CreateProfilePayload>({
    mutationFn: createProfile,
    mutationKey: profileCreateMutationKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });
};

