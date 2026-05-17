import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../services/token.service.js";
const getTokenFromHeader = (authorizationHeader) => {
    if (!authorizationHeader) {
        return null;
    }
    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return null;
    }
    return token;
};
export const requireAuth = (req, _res, next) => {
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
    }
    catch {
        next(new AppError("Unauthorized", 401));
    }
};
export const authorizeRoles = (...allowedRoles) => {
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
//# sourceMappingURL=auth.middleware.js.map