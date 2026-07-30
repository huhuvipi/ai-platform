import OpenAI from "openai";
import { env } from "../config/env";
import type { AIProvider } from "./AIProvider";

export class OpenAIProvider implements AIProvider {
  private client = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  async summarize(text: string): Promise<string> {
    const response = await this.client.responses.create({
      model: "gpt-4.1-mini",
      input: `Summarize the following text:\n\n${text}`,
    });

    return response.output_text;
  }
}