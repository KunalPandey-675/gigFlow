import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const generateAccessToken = (payload) => {
    const expiresIn = env.JWT_EXPIRES_IN;
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn,
    });
};
export const verifyAccessToken = (token) => {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }
    return {
        sub: decoded.sub ?? "",
        email: decoded.email,
        role: decoded.role,
    };
};
//# sourceMappingURL=token.service.js.map