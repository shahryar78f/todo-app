export interface SignupPayload {
  email: string;
  password: string;
}

export interface SignupResponse {
  status: 'success' | 'failed';
  message?: string;
}
