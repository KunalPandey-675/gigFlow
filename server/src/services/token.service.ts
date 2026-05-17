import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthTokenPayload } from "../types/auth.types.js";

export const generateAccessToken = (payload: AuthTokenPayload): string => {
  const expiresIn = env.JWT_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>;

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn,
  });
};

export const verifyAccessToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return {
    sub: decoded.sub ?? "",
    email: decoded.email as string,
    role: decoded.role as AuthTokenPayload["role"],
  };
};
