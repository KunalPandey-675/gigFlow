import type { RequestHandler } from "express";
import { LeadModel } from "../models/lead.model.js";
import type { LeadSource, LeadStatus } from "../types/lead.types.js";

const DUMMY_LEADS = [
  {
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "new" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "TechVision Labs",
    email: "sales@techvision.io",
    status: "contacted" as LeadStatus,
    source: "instagram" as LeadSource,
  },
  {
    name: "Global Ventures",
    email: "info@globalventures.com",
    status: "qualified" as LeadStatus,
    source: "referral" as LeadSource,
  },
  {
    name: "Digital Dynamics",
    email: "hello@digitaldynamics.net",
    status: "new" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "InnovateCo",
    email: "reach@innovate.co",
    status: "lost" as LeadStatus,
    source: "instagram" as LeadSource,
  },
  {
    name: "StartupHub",
    email: "connect@startuphub.io",
    status: "qualified" as LeadStatus,
    source: "referral" as LeadSource,
  },
  {
    name: "FutureTech Industries",
    email: "business@futuretech.io",
    status: "contacted" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "CloudNine Systems",
    email: "support@cloudnine.com",
    status: "new" as LeadStatus,
    source: "instagram" as LeadSource,
  },
  {
    name: "Enterprise Solutions Ltd",
    email: "sales@enterprise-solutions.co.uk",
    status: "qualified" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "Digital First Agency",
    email: "hello@digitalfirst.io",
    status: "contacted" as LeadStatus,
    source: "referral" as LeadSource,
  },
  {
    name: "Swift Systems",
    email: "info@swiftsystems.com",
    status: "new" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "Velocity Corp",
    email: "contact@velocitycorp.io",
    status: "lost" as LeadStatus,
    source: "instagram" as LeadSource,
  },
  {
    name: "Nexus Technology",
    email: "hello@nexustech.io",
    status: "new" as LeadStatus,
    source: "referral" as LeadSource,
  },
  {
    name: "PrimeFlow Solutions",
    email: "sales@primeflow.io",
    status: "qualified" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "Quantum Leap",
    email: "info@quantumleap.io",
    status: "contacted" as LeadStatus,
    source: "instagram" as LeadSource,
  },
  {
    name: "Horizon Ventures",
    email: "reach@horizon.io",
    status: "new" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "EchoWorks",
    email: "contact@echoworks.io",
    status: "qualified" as LeadStatus,
    source: "referral" as LeadSource,
  },
  {
    name: "Bright Ideas Studio",
    email: "hello@brightideas.io",
    status: "contacted" as LeadStatus,
    source: "website" as LeadSource,
  },
  {
    name: "Swift Innovations",
    email: "info@swiftinnovations.io",
    status: "new" as LeadStatus,
    source: "instagram" as LeadSource,
  },
  {
    name: "Alpha Dynamics",
    email: "sales@alphadynamics.io",
    status: "lost" as LeadStatus,
    source: "referral" as LeadSource,
  },
];

export const seedLeads: RequestHandler = async (_req, res, next) => {
  try {
    // Clear existing leads
    await LeadModel.deleteMany({});

    // Insert dummy leads
    const created = await LeadModel.insertMany(DUMMY_LEADS);

    return res.status(201).json({
      success: true,
      message: `Successfully seeded ${created.length} leads`,
      data: {
        count: created.length,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const clearLeads: RequestHandler = async (_req, res, next) => {
  try {
    const result = await LeadModel.deleteMany({});

    return res.status(200).json({
      success: true,
      message: `Cleared ${result.deletedCount} leads`,
      data: {
        count: result.deletedCount,
      },
    });
  } catch (error) {
    return next(error);
  }
};
