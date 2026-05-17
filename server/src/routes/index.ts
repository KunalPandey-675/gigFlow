import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { leadRouter } from "./lead.route.js";
import { healthRouter } from "./health.route.js";
import { seedRouter } from "./seed.route.js";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(authRouter);
apiRouter.use(leadRouter);
apiRouter.use(seedRouter);

export { apiRouter };
