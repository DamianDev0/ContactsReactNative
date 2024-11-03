export interface LoginResponse {
  code: number;
  message: string;
  data: {
    id: string;
    accessToken: string;
  };
}

export interface RegisterResponse {
  code: number;
  message: string;
  data: {
    id: string;
    email: string;
  };
}
