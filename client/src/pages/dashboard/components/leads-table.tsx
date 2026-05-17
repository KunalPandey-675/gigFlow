import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/types/lead.types";
import { getErrorMessage } from "@/utils/error";

const statusStyles: Record<string, "default" | "success" | "warning" | "info" | "destructive"> = {
  new: "info",
  contacted: "warning",
  qualified: "success",
  lost: "destructive",
};

const sourceStyles: Record<string, "default" | "secondary" | "outline"> = {
  website: "default",
  instagram: "secondary",
  referral: "outline",
};

type LeadsTableProps = {
  leads: Lead[];
  showSkeleton: boolean;
  isError: boolean;
  error: unknown;
  isAdmin: boolean;
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

export function LeadsTable({
  leads, showSkeleton, isError, error, isAdmin, onView, onEdit, onDelete, isDeleting
}: LeadsTableProps) {
  if (isError) {
    return (
      <div className="p-6 text-sm font-medium text-destructive bg-destructive/10">
        {getErrorMessage(error, "Unable to load leads right now.")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-6 py-4 text-left">Lead name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Source</th>
            <th className="px-6 py-4 text-left">Date added</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {showSkeleton ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 w-40 rounded bg-muted" /></td>
                <td className="px-6 py-4"><div className="h-4 w-48 rounded bg-muted" /></td>
                <td className="px-6 py-4"><div className="h-6 w-24 rounded-full bg-muted" /></td>
                <td className="px-6 py-4"><div className="h-6 w-24 rounded-full bg-muted" /></td>
                <td className="px-6 py-4"><div className="h-4 w-28 rounded bg-muted" /></td>
                <td className="px-6 py-4"><div className="h-8 w-32 rounded bg-muted" /></td>
              </tr>
            ))
          ) : leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead._id} className="transition-colors hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{lead.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{lead.email}</td>
                <td className="px-6 py-4">
                  <Badge variant={statusStyles[lead.status] || "default"}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={sourceStyles[lead.source] || "default"}>
                    {lead.source}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onView(lead)}>
                      View
                    </Button>
                    {isAdmin && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => onEdit(lead)}>
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          disabled={isDeleting}
                          onClick={() => {
                            if (window.confirm("Delete this lead? This cannot be undone.")) {
                              onDelete(lead._id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-16 text-center text-sm text-muted-foreground" colSpan={6}>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">📭</div>
                  <div className="font-medium text-foreground">No leads match your filters</div>
                  <div className="text-xs">Try clearing filters or adjusting your search.</div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
