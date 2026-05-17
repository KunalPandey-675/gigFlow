import { Router } from "express";
import { createLead, deleteLead, getLeadById, getLeads, updateLead, } from "../controllers/lead.controller.js";
import { authorizeRoles, requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateQuery } from "../middlewares/validateQuery.middleware.js";
import { createLeadSchema, filterLeadsSchema, updateLeadSchema } from "../validations/lead.validation.js";
const leadRouter = Router();
leadRouter.post("/leads", requireAuth, authorizeRoles("admin"), validate(createLeadSchema), createLead);
leadRouter.get("/leads", requireAuth, validateQuery(filterLeadsSchema), getLeads);
leadRouter.get("/leads/:id", requireAuth, getLeadById);
leadRouter.patch("/leads/:id", requireAuth, authorizeRoles("admin"), validate(updateLeadSchema), updateLead);
leadRouter.delete("/leads/:id", requireAuth, authorizeRoles("admin"), deleteLead);
export { leadRouter };
//# sourceMappingURL=lead.route.js.map