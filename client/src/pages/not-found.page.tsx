import { Link } from "react-router-dom";
import { AppShell } from "@/components/shared/app-shell";
import { PageContainer } from "@/components/shared/page-container";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
          <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">Page not found</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
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
