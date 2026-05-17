import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { API_PREFIX } from "./constants/api.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { apiRouter } from "./routes/index.js";

const app = express();

const normalizeOrigin = (origin: string): string => origin.replace(/\/+$/, "");

const allowedOrigins = env.CLIENT_URL.split(",")
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = origin ? normalizeOrigin(origin) : "";

      if (!origin || allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_PREFIX, apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
