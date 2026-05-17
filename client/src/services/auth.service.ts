import { axiosClient } from "@/services/http/axios-client";
import type { AuthUser } from "@/types/auth.types";

export interface AuthResponse<T> {
  success: true;
  message: string;
  data: T;
}

interface AuthSessionPayload {
  user: AuthUser;
  accessToken: string;
}

export const register = async (payload: { name: string; email: string; password: string; role?: string }) => {
  const res = await axiosClient.post<AuthResponse<AuthSessionPayload>>("/auth/register", payload);
  return res.data.data;
};

export const login = async (payload: { email: string; password: string }) => {
  const res = await axiosClient.post<AuthResponse<AuthSessionPayload>>("/auth/login", payload);
  return res.data.data;
};

export const me = async () => {
  const res = await axiosClient.get<AuthResponse<{ user: AuthUser }>>("/auth/me");
  return res.data.data;
};
