import type { PropsWithChildren } from "react";

interface PageContainerProps extends PropsWithChildren {
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <section className={`rounded-xl border bg-card text-card-foreground shadow-sm md:p-8 p-6 ${className || ''}`}>
      {children}
    </section>
  );
}
