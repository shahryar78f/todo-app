import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/profile.api';
import type { ProfileMutationResponse, UpdateProfilePayload } from '../types/profile.types';
import { profileQueryKey, profileUpdateMutationKey } from '../queryKey';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<ProfileMutationResponse, Error, UpdateProfilePayload>({
    mutationFn: updateProfile,
    mutationKey: profileUpdateMutationKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });
};

