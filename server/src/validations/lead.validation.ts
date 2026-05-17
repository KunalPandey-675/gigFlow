import { z } from "zod";

const leadStatuses = ["new", "contacted", "qualified", "lost"] as const;
const leadSources = ["website", "instagram", "referral"] as const;

export const createLeadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email format").toLowerCase(),
  status: z.enum(leadStatuses).optional(),
  source: z.enum(leadSources, "Source must be one of: website, instagram, referral"),
});

export const updateLeadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100).optional(),
  email: z.string().trim().email("Invalid email format").toLowerCase().optional(),
  status: z.enum(leadStatuses).optional(),
  source: z.enum(leadSources).optional(),
});

export const filterLeadsSchema = z.object({
  status: z.enum(leadStatuses).optional(),
  source: z.enum(leadSources).optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sort: z.enum(["latest", "oldest"]).default("latest"),
});
