export interface Profile {
  name: string;
  lastName: string;
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
}

export interface UpdateProfilePayload {
  name: string;
  lastName: string;
}

export interface ProfileMutationResponse {
  status: 'success' | 'failed';
  message?: string;
}

