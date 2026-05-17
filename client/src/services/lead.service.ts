import { axiosClient } from "./http/axios-client";
import type { Lead, LeadListResponse, LeadQueryFilters, LeadSource, LeadStatus } from "@/types/lead.types";

interface LeadResponse {
  success: true;
  message: string;
  data: {
    lead: Lead;
  };
}

interface DeleteLeadResponse {
  success: true;
  message: string;
}

export async function getLeads(params: LeadQueryFilters = {}) {
  const res = await axiosClient.get<{ success: true; message: string; data: { leads: LeadListResponse["leads"] }; meta: LeadListResponse["meta"] }>("/leads", { params });

  return {
    leads: res.data.data.leads,
    meta: res.data.meta,
  } satisfies LeadListResponse;
}

export async function getLeadById(id: string): Promise<Lead> {
  const res = await axiosClient.get<LeadResponse>(`/leads/${id}`);
  return res.data.data.lead;
}

export async function createLead(payload: {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
}): Promise<Lead> {
  const res = await axiosClient.post<LeadResponse>("/leads", payload);
  return res.data.data.lead;
}

export async function updateLead(
  id: string,
  payload: {
    name?: string;
    email?: string;
    status?: LeadStatus;
    source?: LeadSource;
  },
): Promise<Lead> {
  const res = await axiosClient.patch<LeadResponse>(`/leads/${id}`, payload);
  return res.data.data.lead;
}

export async function deleteLead(id: string): Promise<void> {
  await axiosClient.delete<DeleteLeadResponse>(`/leads/${id}`);
}
