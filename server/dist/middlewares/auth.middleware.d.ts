import type { RequestHandler } from "express";
import type { UserRole } from "../types/auth.types.js";
export declare const requireAuth: RequestHandler;
export declare const authorizeRoles: (...allowedRoles: UserRole[]) => RequestHandler;
