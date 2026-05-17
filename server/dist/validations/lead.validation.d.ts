import { z } from "zod";
export declare const createLeadSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        qualified: "qualified";
        lost: "lost";
    }>>;
    source: z.ZodEnum<{
        website: "website";
        instagram: "instagram";
        referral: "referral";
    }>;
}, z.core.$strip>;
export declare const updateLeadSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        qualified: "qualified";
        lost: "lost";
    }>>;
    source: z.ZodOptional<z.ZodEnum<{
        website: "website";
        instagram: "instagram";
        referral: "referral";
    }>>;
}, z.core.$strip>;
export declare const filterLeadsSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        qualified: "qualified";
        lost: "lost";
    }>>;
    source: z.ZodOptional<z.ZodEnum<{
        website: "website";
        instagram: "instagram";
        referral: "referral";
    }>>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sort: z.ZodDefault<z.ZodEnum<{
        latest: "latest";
        oldest: "oldest";
    }>>;
}, z.core.$strip>;
