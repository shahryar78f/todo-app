export interface Profile {
  name: string;
  lastName: string;
  avatar?: string;
  email: string;
}

export interface GetProfileResponse {
  status: 'success' | 'failed';
  message?: string;
  data?: Profile;
}

export interface CreateProfilePayload {
  name: string;
  lastName: string;
  password: string;
  avatar?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  lastName?: string;
  avatar?: string;
}

export interface ProfileMutationResponse {
  status: 'success' | 'failed';
  message?: string;
}

