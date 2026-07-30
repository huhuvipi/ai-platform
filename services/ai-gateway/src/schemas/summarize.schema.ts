import {z} from "zod";

export const summarizeSchema = z.object({
    provider: z.enum(["openai"]).default("openai"),
  text: z.string().min(1, "Text is required"),
});

export type SummarizeSchema = z.infer<typeof summarizeSchema>;

// debug: log schema at load time
// (no-op) schema loads during module initialization