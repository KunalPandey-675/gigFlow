import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { queryClient } from "@/lib/query-client";
import { router } from "@/routes/router";
import { authStore } from "@/store/auth.store";
import { me } from "@/services/auth.service";
import { ThemeProvider } from "@/components/theme-provider";

export function AppProviders() {
  useEffect(() => {
    const token = authStore.getState().token;
    const user = authStore.getState().user;

    if (token) {
      authStore.getState().resumeSession();
    }

    if (token && !user) {
      void (async () => {
        try {
          const data = await me();
          authStore.getState().setSession(token, data.user);
        } catch {
          authStore.getState().clearSession();
        }
      })();
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="gigflow-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
