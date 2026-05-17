import axios, { AxiosError } from "axios";
import { env } from "@/config/env";
import { authStore } from "@/store/auth.store";
import { ROUTES } from "@/constants/routes";

export interface ApiErrorShape {
  success: false;
  message: string;
  errors?: Array<{ path: string; message: string }>;
}

export const axiosClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = authStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorShape>) => {
    // Auto-logout on 401 Unauthorized
    const status = error.response?.status;
    if (status === 401) {
      try {
        authStore.getState().clearSession(true);
        // ensure redirect to login
        window.location.href = ROUTES.LOGIN;
      } catch (e) {}
    }

    return Promise.reject(error.response?.data ?? error);
  },
);
