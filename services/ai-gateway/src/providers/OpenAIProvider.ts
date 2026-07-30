import OpenAI from "openai";
import { env } from "../config/env";
import type { AIProvider } from "./AIProvider";

export class OpenAIProvider implements AIProvider {
  private client?: OpenAI;

  constructor() {
    if (env.OPENAI_API_KEY) {
      this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    }
  }

  async summarize(text: string, language = "Vietnamese"): Promise<string> {
    if (!this.client) {
      return Promise.resolve(
        `MOCK SUMMARY (${language}): ${text.slice(0, 60)}${text.length > 60 ? '...' : ''}`
      );
    }

    const response = await this.client.responses.create({
      model: "gpt-4.1-mini",
      input: `Please write a detailed ${language} summary of the following text. Include all key points, keep the result longer than one sentence, and use complete sentences.

${text}`,
    });

    return response.output_text;
  }
}
