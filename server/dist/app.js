import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { API_PREFIX } from "./constants/api.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { apiRouter } from "./routes/index.js";
const app = express();
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(API_PREFIX, apiRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
export { app };
//# sourceMappingURL=app.js.map