import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required").optional(),
});

export const env = envSchema.parse(process.env);