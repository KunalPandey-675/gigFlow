export type NodeEnvironment = "development" | "test" | "production";

export interface EnvConfig {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CLIENT_URL: string;
}
