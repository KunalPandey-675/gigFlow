import type { RequestHandler } from "express";
import { AppError } from "../utils/app-error.js";
import { LeadModel } from "../models/lead.model.js";
import type { Lead, LeadSource, LeadStatus } from "../types/lead.types.js";

export const createLead: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, status, source } = req.body as {
      name: string;
      email: string;
      status?: string;
      source: string;
    };

    const lead = await LeadModel.create({
      name,
      email,
      status: (status ?? "new") as LeadStatus,
      source: source as LeadSource,
    });

    const leadData: Lead = {
      _id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    };

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: {
        lead: leadData,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getLeads: RequestHandler = async (req, res, next) => {
  try {
    const { status, source, search, page, limit, sort } = req.query as {
      status?: string;
      source?: string;
      search?: string;
      page?: number;
      limit?: number;
      sort?: "latest" | "oldest";
    };

    const pageNum = Math.max(1, Number(page ?? 1));
    const limitNum = Math.min(100, Math.max(1, Number(limit ?? 10)));
    const skip = (pageNum - 1) * limitNum;

    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (source) filter.source = source;

    // Use text search when available for better performance
    if (search && search.trim()) {
      filter.$text = { $search: search.trim() };
    }

    const sortOrder = sort === "oldest" ? 1 : -1;

    // Execute find and count in parallel for performance
    const [leads, total] = await Promise.all([
      LeadModel.find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limitNum),
      LeadModel.countDocuments(filter),
    ]);

    const leadData: Lead[] = leads.map((lead) => ({
      _id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: {
        leads: leadData,
      },
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getLeadById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await LeadModel.findById(id);

    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    const leadData: Lead = {
      _id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: {
        lead: leadData,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateLead: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rawUpdateData = req.body as {
      name?: string;
      email?: string;
      status?: string;
      source?: string;
    };

    const updateData: Partial<Record<keyof typeof rawUpdateData, unknown>> = {};
    if (rawUpdateData.name !== undefined) updateData.name = rawUpdateData.name;
    if (rawUpdateData.email !== undefined) updateData.email = rawUpdateData.email;
    if (rawUpdateData.status !== undefined) updateData.status = rawUpdateData.status as LeadStatus;
    if (rawUpdateData.source !== undefined) updateData.source = rawUpdateData.source as LeadSource;

    const lead = await LeadModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    const leadData: Lead = {
      _id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: {
        lead: leadData,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteLead: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await LeadModel.findByIdAndDelete(id);

    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
