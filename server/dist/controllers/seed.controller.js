import { LeadModel } from "../models/lead.model.js";
const DUMMY_LEADS = [
    {
        name: "Acme Corporation",
        email: "contact@acme.com",
        status: "new",
        source: "website",
    },
    {
        name: "TechVision Labs",
        email: "sales@techvision.io",
        status: "contacted",
        source: "instagram",
    },
    {
        name: "Global Ventures",
        email: "info@globalventures.com",
        status: "qualified",
        source: "referral",
    },
    {
        name: "Digital Dynamics",
        email: "hello@digitaldynamics.net",
        status: "new",
        source: "website",
    },
    {
        name: "InnovateCo",
        email: "reach@innovate.co",
        status: "lost",
        source: "instagram",
    },
    {
        name: "StartupHub",
        email: "connect@startuphub.io",
        status: "qualified",
        source: "referral",
    },
    {
        name: "FutureTech Industries",
        email: "business@futuretech.io",
        status: "contacted",
        source: "website",
    },
    {
        name: "CloudNine Systems",
        email: "support@cloudnine.com",
        status: "new",
        source: "instagram",
    },
    {
        name: "Enterprise Solutions Ltd",
        email: "sales@enterprise-solutions.co.uk",
        status: "qualified",
        source: "website",
    },
    {
        name: "Digital First Agency",
        email: "hello@digitalfirst.io",
        status: "contacted",
        source: "referral",
    },
    {
        name: "Swift Systems",
        email: "info@swiftsystems.com",
        status: "new",
        source: "website",
    },
    {
        name: "Velocity Corp",
        email: "contact@velocitycorp.io",
        status: "lost",
        source: "instagram",
    },
    {
        name: "Nexus Technology",
        email: "hello@nexustech.io",
        status: "new",
        source: "referral",
    },
    {
        name: "PrimeFlow Solutions",
        email: "sales@primeflow.io",
        status: "qualified",
        source: "website",
    },
    {
        name: "Quantum Leap",
        email: "info@quantumleap.io",
        status: "contacted",
        source: "instagram",
    },
    {
        name: "Horizon Ventures",
        email: "reach@horizon.io",
        status: "new",
        source: "website",
    },
    {
        name: "EchoWorks",
        email: "contact@echoworks.io",
        status: "qualified",
        source: "referral",
    },
    {
        name: "Bright Ideas Studio",
        email: "hello@brightideas.io",
        status: "contacted",
        source: "website",
    },
    {
        name: "Swift Innovations",
        email: "info@swiftinnovations.io",
        status: "new",
        source: "instagram",
    },
    {
        name: "Alpha Dynamics",
        email: "sales@alphadynamics.io",
        status: "lost",
        source: "referral",
    },
];
export const seedLeads = async (_req, res, next) => {
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
    }
    catch (error) {
        return next(error);
    }
};
export const clearLeads = async (_req, res, next) => {
    try {
        const result = await LeadModel.deleteMany({});
        return res.status(200).json({
            success: true,
            message: `Cleared ${result.deletedCount} leads`,
            data: {
                count: result.deletedCount,
            },
        });
    }
    catch (error) {
        return next(error);
    }
};
//# sourceMappingURL=seed.controller.js.map