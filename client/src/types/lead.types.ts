export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type LeadSource = "website" | "instagram" | "referral";
export type LeadSort = "latest" | "oldest";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface LeadListResponse {
  leads: Lead[];
  meta: LeadListMeta;
}

export interface LeadQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  sort?: LeadSort;
}
