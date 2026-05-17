import type { RequestHandler } from "express";
import type { ZodType } from "zod";
export declare const validateQuery: <T>(schema: ZodType<T>) => RequestHandler;
