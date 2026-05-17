import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LeadSort, LeadSource, LeadStatus, LeadListMeta } from "@/types/lead.types";

const statusOptions: Array<{ label: string; value: LeadStatus | "all" }> = [
  { label: "All statuses", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Lost", value: "lost" },
];

const sourceOptions: Array<{ label: string; value: LeadSource | "all" }> = [
  { label: "All sources", value: "all" },
  { label: "Website", value: "website" },
  { label: "Instagram", value: "instagram" },
  { label: "Referral", value: "referral" },
];

const sortOptions: Array<{ label: string; value: LeadSort }> = [
  { label: "Newest first", value: "latest" },
  { label: "Oldest first", value: "oldest" },
];

type LeadsFiltersProps = {
  search: string;
  setSearch: (val: string) => void;
  status: LeadStatus | "all";
  setStatus: (val: LeadStatus | "all") => void;
  source: LeadSource | "all";
  setSource: (val: LeadSource | "all") => void;
  sort: LeadSort;
  setSort: (val: LeadSort) => void;
  onExport: () => void;
  canExport: boolean;
  onAdd: () => void;
  isAdmin: boolean;
  meta?: LeadListMeta | undefined;
};

export function LeadsFilters({
  search, setSearch, status, setStatus, source, setSource, sort, setSort,
  onExport, canExport, onAdd, isAdmin, meta
}: LeadsFiltersProps) {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">Filters & Actions</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={onExport} disabled={!canExport}>
            Export CSV
          </Button>
          {isAdmin && (
            <Button onClick={onAdd}>
              Add lead
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</Label>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name or email..."
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</Label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as LeadStatus | "all")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source</Label>
          <select
            value={source}
            onChange={(event) => setSource(event.target.value as LeadSource | "all")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sort by</Label>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as LeadSort)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <div className="text-sm text-muted-foreground">
          {meta ? (
            <span>
              Showing <span className="font-medium text-foreground">{meta.total}</span> total leads
            </span>
          ) : (
            <span>Loading leads...</span>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSearch("");
            setStatus("all");
            setSource("all");
            setSort("latest");
          }}
        >
          Reset filters
        </Button>
      </div>
    </>
  );
}
