// src/types/loginResponse.ts
export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
  };
}
