import { Link } from "react-router-dom";
import { AppShell } from "@/components/shared/app-shell";
import { PageContainer } from "@/components/shared/page-container";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export function ForbiddenPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
          <h1 className="text-6xl font-bold tracking-tight text-foreground">403</h1>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">Access denied</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            You don't have permission to access this page. Please log in with an authorized account or return to the home page.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link to={ROUTES.LOGIN}>
                Sign in
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link to={ROUTES.HOME}>
                Return home
              </Link>
            </Button>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
