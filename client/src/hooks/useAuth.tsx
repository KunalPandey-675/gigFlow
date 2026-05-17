import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi, me as meApi, register as registerApi } from "@/services/auth.service";
import { authStore } from "@/store/auth.store";

export const useAuth = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (data: { name: string; email: string; password: string; role?: string }) => registerApi(data),
    onSuccess: (data) => {
      authStore.getState().setSession(data.accessToken, data.user);
      navigate("/dashboard");
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginApi(data),
    onSuccess: (data) => {
      authStore.getState().setSession(data.accessToken, data.user);
      navigate("/dashboard");
    },
  });

  const meQuery = useMutation({
    mutationFn: () => meApi(),
    onSuccess: (data) => {
      authStore.getState().setSession(authStore.getState().token ?? "", data.user);
    },
  });

  return { registerMutation, loginMutation, meQuery };
};
