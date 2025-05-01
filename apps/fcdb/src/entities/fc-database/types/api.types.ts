export type ApiRequestConfig = {
  query?: Record<string, any>;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export type ApiRequest = <T>(
  url: string,
  config?: ApiRequestConfig
) => Promise<T>;

export type ApiResponse<T> = {
  data: T;
  status: number;
  success: boolean;
  message?: string;
};

export type ApiErrorResponse = {
  error: {
    name: string;
    message: string;
  };
};
