import type { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../services/token.service.js";
import type { UserRole } from "../types/auth.types.js";

const getTokenFromHeader = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const requireAuth: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromHeader(req.headers.authorization);

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const payload = verifyAccessToken(token);

    if (!payload.sub || !payload.email || !payload.role) {
      throw new AppError("Unauthorized", 401);
    }

    req.user = payload;
    next();
  } catch {
    next(new AppError("Unauthorized", 401));
  }
};

export const authorizeRoles = (...allowedRoles: UserRole[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    return next();
  };
};
