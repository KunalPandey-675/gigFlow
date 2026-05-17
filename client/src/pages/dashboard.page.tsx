import { AppShell } from "@/components/shared/app-shell";
import { SectionHeader } from "@/components/shared/section-header";
import { LeadsContainer } from "./dashboard/components/leads-container";

export function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Leads" subtitle="Manage and track all your leads in one place" />
        <LeadsContainer />
      </div>
    </AppShell>
  );
}
