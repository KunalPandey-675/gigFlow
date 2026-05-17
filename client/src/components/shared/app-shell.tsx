import type { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { authStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function AppShell({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = authStore();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    authStore.getState().clearSession();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-colors hover:text-foreground/80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
                G
              </div>
              <span>GigFlow</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center gap-4 border-l pl-4 border-border">
                  <div className="hidden text-right sm:block">
                    <div className="text-sm font-medium leading-none">{user?.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{user?.role}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 md:px-8">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
