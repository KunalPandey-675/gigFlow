import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url("VITE_API_BASE_URL must be a valid URL"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  const message = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid client environment variables: ${message}`);
}

export const env = parsed.data;
