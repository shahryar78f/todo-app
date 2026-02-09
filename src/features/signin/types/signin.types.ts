export interface SigninPayload {
    email: string;
    password: string;
  }
  
  export interface SigninResponse {
    status: 'success' | 'failed';
    message?: string;
  }
  