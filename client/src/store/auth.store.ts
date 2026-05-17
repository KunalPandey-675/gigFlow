import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types/auth.types";
import { getTokenExpiryMs } from "@/utils/jwt";
import { ROUTES } from "@/constants/routes";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  _logoutTimerId?: number | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: (redirect?: boolean) => void;
  resumeSession: () => void;
}

function clearTimer(timerId?: number | null) {
  if (timerId) {
    window.clearTimeout(timerId);
  }
}

function scheduleExpiry(getState: () => AuthState, setState: (patch: Partial<AuthState>) => void, token: string) {
  clearTimer(getState()._logoutTimerId);

  const msUntilExpiry = getTokenExpiryMs(token);
  if (msUntilExpiry <= 0) {
    getState().clearSession(true);
    return;
  }

  const timerId = window.setTimeout(() => {
    getState().clearSession(true);
  }, msUntilExpiry);

  setState({ _logoutTimerId: timerId });
}

export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      _logoutTimerId: null,
      setSession: (token, user) => {
        set({ token, user, isAuthenticated: true });
        scheduleExpiry(get, set, token);
      },
      clearSession: (redirect = false) => {
        clearTimer(get()._logoutTimerId);
        set({ token: null, user: null, isAuthenticated: false, _logoutTimerId: null });
        if (redirect) {
          try {
            window.location.href = ROUTES.LOGIN;
          } catch {
            // ignore
          }
        }
      },
      resumeSession: () => {
        const { token } = get();
        if (token) {
          scheduleExpiry(get, set, token);
        }
      },
    }),
    {
      name: "gigflow-auth-store",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
