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

  async summarize(text: string): Promise<string> {
    if (!this.client) {
      return Promise.resolve(
        `MOCK SUMMARY: ${text.slice(0, 60)}${text.length > 60 ? '...' : ''}`
      );
    }

    const response = await this.client.responses.create({
      model: "gpt-4.1-mini",
      input: `Summarize the following text:\n\n${text}`,
    });

    return response.output_text;
  }
}