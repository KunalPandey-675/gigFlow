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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export function RegisterPage() {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { registerMutation } = useAuth();
  const isPending = registerMutation.status === "pending";

  const onSubmit = (data: FormValues) => {
    registerMutation.mutate({ ...data });
  };

  return (
    <AppShell>
      <div className="flex w-full items-center justify-center py-12 md:py-24">
        <Card className="mx-auto w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Get started</CardTitle>
            <CardDescription>Create an account to start managing leads</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  disabled={isPending}
                  {...register("name")}
                />
                {formState.errors.name ? (
                  <p className="text-[0.8rem] font-medium text-destructive">{formState.errors.name.message}</p>
                ) : null}
              </div>

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
                <Label htmlFor="password">Password</Label>
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

              {registerMutation.error ? (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive font-medium">
                  {getErrorMessage(registerMutation.error, "Registration failed")}
                </div>
              ) : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="font-semibold text-primary hover:underline underline-offset-4 transition-colors">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppShell>
  );
}
