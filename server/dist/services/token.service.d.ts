import type { AuthTokenPayload } from "../types/auth.types.js";
export declare const generateAccessToken: (payload: AuthTokenPayload) => string;
export declare const verifyAccessToken: (token: string) => AuthTokenPayload;
