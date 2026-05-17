export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, string | number | boolean | null>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{ path: string; message: string }>;
}
