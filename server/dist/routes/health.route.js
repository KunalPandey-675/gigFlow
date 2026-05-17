import { Router } from "express";
const healthRouter = Router();
healthRouter.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "GigFlow API is healthy",
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        },
    });
});
export { healthRouter };
//# sourceMappingURL=health.route.js.map