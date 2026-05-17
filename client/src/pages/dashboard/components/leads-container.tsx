import { useEffect, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLead, deleteLead, getLeads, updateLead } from "@/services/lead.service";
import type { Lead, LeadListResponse, LeadQueryFilters, LeadSort, LeadSource, LeadStatus } from "@/types/lead.types";
import { authStore } from "@/store/auth.store";
import { LeadsFilters } from "./leads-filters";
import { LeadsTable } from "./leads-table";
import { LeadsPagination } from "./leads-pagination";
import { LeadsModal } from "./leads-modal";
import { Card } from "@/components/ui/card";

export function LeadsContainer() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [source, setSource] = useState<LeadSource | "all">("all");
  const [sort, setSort] = useState<LeadSort>("latest");
  
  const queryClient = useQueryClient();
  const { user } = authStore();
  const isAdmin = user?.role === "admin";
  
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view" | null>(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const openCreate = () => {
    if (!isAdmin) return;
    setActiveLead(null);
    setModalMode("create");
  };

  const openEdit = (lead: Lead) => {
    if (!isAdmin) return;
    setActiveLead(lead);
    setModalMode("edit");
  };

  const openView = (lead: Lead) => {
    setActiveLead(lead);
    setModalMode("view");
  };

  const closeModal = () => {
    setModalMode(null);
    setActiveLead(null);
  };

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Lead> }) =>
      updateLead(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, source, sort]);

  const query = useQuery<LeadListResponse, unknown>({
    queryKey: ["leads", page, limit, debouncedSearch, status, source, sort],
    queryFn: () => {
      const params: LeadQueryFilters = { page, limit, sort };
      if (debouncedSearch) params.search = debouncedSearch;
      if (status !== "all") params.status = status;
      if (source !== "all") params.source = source;
      return getLeads(params);
    },
    placeholderData: keepPreviousData,
  });

  const leads = query.data?.leads ?? [];
  const meta = query.data?.meta;
  const showSkeleton = query.isPending && leads.length === 0;

  const exportCsv = () => {
    if (leads.length === 0) return;
    const escapeCsv = (value: string) => {
      const needsQuotes = /[",\n]/.test(value);
      const escaped = value.replace(/"/g, '""');
      return needsQuotes ? `"${escaped}"` : escaped;
    };
    const headers = ["Name", "Email", "Status", "Source", "Created At"];
    const rows = leads.map((lead) => [
      escapeCsv(lead.name),
      escapeCsv(lead.email),
      escapeCsv(lead.status),
      escapeCsv(lead.source),
      escapeCsv(new Date(lead.createdAt).toLocaleString()),
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gigflow-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <LeadsFilters 
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          source={source}
          setSource={setSource}
          sort={sort}
          setSort={setSort}
          onExport={exportCsv}
          canExport={leads.length > 0}
          onAdd={openCreate}
          isAdmin={isAdmin}
          meta={meta}
        />
      </Card>

      <Card className="overflow-hidden">
        <LeadsTable 
          leads={leads}
          showSkeleton={showSkeleton}
          isError={query.isError}
          error={query.error}
          isAdmin={isAdmin}
          onView={openView}
          onEdit={openEdit}
          onDelete={(id) => deleteMutation.mutate(id)}
          isDeleting={deleteMutation.isPending}
        />
      </Card>

      <Card className="p-4">
        <LeadsPagination 
          page={page}
          setPage={setPage}
          meta={meta}
          limit={limit}
          isFetching={query.isFetching}
        />
      </Card>

      {modalMode && (
        <LeadsModal 
          mode={modalMode}
          lead={activeLead}
          onClose={closeModal}
          onSaveCreate={(data) => createMutation.mutate(data)}
          onSaveEdit={(id, data) => updateMutation.mutate({ id, payload: data })}
          isSaving={createMutation.isPending || updateMutation.isPending}
          saveError={createMutation.error || updateMutation.error}
        />
      )}
    </div>
  );
}
