import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { AppShell } from "@/components/shared/app-shell";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { loginMutation } = useAuth();
  const isPending = loginMutation.status === "pending";

  const onSubmit = (data: FormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <AppShell>
      <div className="flex w-full items-center justify-center py-12 md:py-24">
        <Card className="mx-auto w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>Sign in to access your leads dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={isPending}
                  {...register("email")}
                />
                {formState.errors.email ? (
                  <p className="text-[0.8rem] font-medium text-destructive">{formState.errors.email.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  disabled={isPending}
                  {...register("password")}
                />
                {formState.errors.password ? (
                  <p className="text-[0.8rem] font-medium text-destructive">{formState.errors.password.message}</p>
                ) : null}
              </div>

              {loginMutation.error ? (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive font-medium">
                  {getErrorMessage(loginMutation.error, "Authentication failed")}
                </div>
              ) : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to={ROUTES.REGISTER} className="font-semibold text-primary hover:underline underline-offset-4 transition-colors">
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppShell>
  );
}
