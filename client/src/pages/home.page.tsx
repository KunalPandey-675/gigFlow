import { Link } from "react-router-dom";
import App from "@/App";
import { ROUTES } from "@/constants/routes";
import { AppShell } from "@/components/shared/app-shell";
import { PageContainer } from "@/components/shared/page-container";
import { authStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function HomePage() {
  const { isAuthenticated } = authStore();

  return (
    <AppShell>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <PageContainer>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                GigFlow - Smart Leads Dashboard
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Organize your pipeline, keep response times tight, and focus on qualified leads with a clean, modern workflow.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {isAuthenticated ? (
                <Button asChild size="lg">
                  <Link to={ROUTES.DASHBOARD}>Open dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" size="lg">
                    <Link to={ROUTES.LOGIN}>Sign in</Link>
                  </Button>
                  <Button asChild size="lg">
                    <Link to={ROUTES.REGISTER}>Create account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </PageContainer>

        <PageContainer>
          <App />
        </PageContainer>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-wider text-muted-foreground font-semibold">Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Fast filtering and pagination keep your lead list responsive even when volume grows.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-wider text-muted-foreground font-semibold">Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Clean typography, balanced spacing, and a light interface keep focus on what matters.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-wider text-muted-foreground font-semibold">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Secure sessions with auto-expiry and protected routes for consistent access control.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
