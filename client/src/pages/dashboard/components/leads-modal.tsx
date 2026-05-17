import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import type { Lead, LeadSource, LeadStatus } from "@/types/lead.types";
import { getErrorMessage } from "@/utils/error";

type LeadsModalProps = {
  mode: "create" | "edit" | "view";
  lead: Lead | null;
  onClose: () => void;
  onSaveCreate: (data: any) => void;
  onSaveEdit: (id: string, data: any) => void;
  isSaving: boolean;
  saveError: unknown;
};

const statusFormOptions: Array<{ label: string; value: LeadStatus }> = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Lost", value: "lost" },
];

const sourceFormOptions: Array<{ label: string; value: LeadSource }> = [
  { label: "Website", value: "website" },
  { label: "Instagram", value: "instagram" },
  { label: "Referral", value: "referral" },
];

export function LeadsModal({ mode, lead, onClose, onSaveCreate, onSaveEdit, isSaving, saveError }: LeadsModalProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    status: "new" as LeadStatus,
    source: "website" as LeadSource,
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && lead) {
      setFormValues({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    } else {
      setFormValues({ name: "", email: "", status: "new", source: "website" });
    }
  }, [mode, lead]);

  const handleSave = () => {
    if (!formValues.name.trim() || !formValues.email.trim()) {
      setFormError("Name and email are required.");
      return;
    }
    setFormError(null);

    if (mode === "create") {
      onSaveCreate({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        status: formValues.status,
        source: formValues.source,
      });
    } else if (mode === "edit" && lead) {
      onSaveEdit(lead._id, {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        status: formValues.status,
        source: formValues.source,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-full max-w-lg shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>
                {mode === "view" ? "Lead details" : mode === "edit" ? "Edit lead" : "Create lead"}
              </CardTitle>
              <CardDescription className="mt-1.5">
                {mode === "view" ? "Review this lead information." : "Provide lead details and save changes."}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
              <span className="text-xl leading-none">&times;</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {mode === "view" && lead ? (
            <div className="space-y-4 text-sm">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Name</Label>
                <div className="mt-1 font-medium">{lead.name}</div>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                <div className="mt-1 font-medium">{lead.email}</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Status</Label>
                  <div className="mt-1 font-medium capitalize">{lead.status}</div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Source</Label>
                  <div className="mt-1 font-medium capitalize">{lead.source}</div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Created</Label>
                  <div className="mt-1 font-medium">{new Date(lead.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Updated</Label>
                  <div className="mt-1 font-medium">{new Date(lead.updatedAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formValues.name}
                  onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Acme Corp"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formValues.email}
                  onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="lead@acme.com"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    value={formValues.status}
                    onChange={(event) => setFormValues((prev) => ({ ...prev, status: event.target.value as LeadStatus }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {statusFormOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <select
                    value={formValues.source}
                    onChange={(event) => setFormValues((prev) => ({ ...prev, source: event.target.value as LeadSource }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {sourceFormOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
                  {formError}
                </div>
              )}

              {!!saveError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
                  {getErrorMessage(saveError, "Unable to save lead.")}
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            {mode === "view" ? "Close" : "Cancel"}
          </Button>
          {mode !== "view" && (
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save lead"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
