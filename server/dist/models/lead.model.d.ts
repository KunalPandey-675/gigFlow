import { type HydratedDocument, type Model } from "mongoose";
import type { LeadSource, LeadStatus } from "../types/lead.types.js";
interface LeadDocument {
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    createdAt: Date;
    updatedAt: Date;
}
type LeadHydratedDocument = HydratedDocument<LeadDocument>;
type LeadModelType = Model<LeadDocument>;
declare const LeadModel: LeadModelType;
export { LeadModel };
export type { LeadDocument, LeadHydratedDocument, LeadModelType };
