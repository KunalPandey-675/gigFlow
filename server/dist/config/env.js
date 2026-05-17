import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(5000),
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN is required"),
    CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL"),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    const formattedErrors = parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
    throw new Error(`Invalid environment variables: ${formattedErrors}`);
}
export const env = parsed.data;
//# sourceMappingURL=env.js.map