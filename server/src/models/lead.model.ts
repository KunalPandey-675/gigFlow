import { model, Schema, type HydratedDocument, type Model } from "mongoose";
import type { Lead, LeadSource, LeadStatus } from "../types/lead.types.js";

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

const leadSchema = new Schema<LeadDocument, LeadModelType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
      required: true,
      index: true,
    },
    source: {
      type: String,
      enum: ["website", "instagram", "referral"],
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Text index to support search on name and email
leadSchema.index({ name: "text", email: "text" });

const LeadModel = model<LeadDocument, LeadModelType>("Lead", leadSchema);

export { LeadModel };
export type { LeadDocument, LeadHydratedDocument, LeadModelType };
