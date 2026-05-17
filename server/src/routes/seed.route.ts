import { Router } from "express";
import { seedLeads, clearLeads } from "../controllers/seed.controller.js";

const seedRouter = Router();

seedRouter.post("/seed/leads", seedLeads);
seedRouter.delete("/seed/leads", clearLeads);

export { seedRouter };
