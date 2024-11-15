export type ApiResponse<T = any> = {
  code: number;
  data: T;
  message: string;
};
