import { Router } from "express";
import {
  getAdminOnlyData,
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { authorizeRoles, requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";

const authRouter = Router();

authRouter.post("/auth/register", validate(registerSchema), registerUser);
authRouter.post("/auth/login", validate(loginSchema), loginUser);
authRouter.get("/auth/me", requireAuth, getCurrentUser);
authRouter.get("/auth/admin-only", requireAuth, authorizeRoles("admin"), getAdminOnlyData);

export { authRouter };
