import { env } from "../config/env";
import type { AIProvider } from "./AIProvider";
import { GoogleGenAI } from "@google/genai";

export class GeminiProvider implements AIProvider {
  private ai: GoogleGenAI | null = null;
  private model: string;

  constructor(model?: string) {
    const apiKey = env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
    this.model = model ?? env.GEMINI_MODEL ?? "models/gemini-2.1";
  }

  async summarize(text: string, language = "Vietnamese"): Promise<string> {
    if (!this.ai) {
      return `MOCK SUMMARY (${language}): ${text.slice(0, 60)}${text.length > 60 ? "..." : ""}`;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: [
          `Please write a detailed ${language} summary of the following text. Include all key points, keep the result longer than one sentence, and use complete sentences.`,
          `Original text:\n\n${text}`,
        ],
        config: {
          maxOutputTokens: 1024,
          temperature: 0.2,
        },
      });

      const summary = response.text ?? this.extractContentText(response);
      return summary.trim() || "";
    } catch (err: any) {
      const message = err?.message ?? String(err);
      const details = err?.response?.data ? ` ${JSON.stringify(err.response.data)}` : "";
      throw new Error(`GeminiProvider error for model ${this.model}: ${message}${details}`);
    }
  }

  private extractContentText(response: any): string {
    const candidates = response?.candidates;
    if (!Array.isArray(candidates)) {
      return "";
    }

    for (const candidate of candidates) {
      const parts = candidate?.content?.parts;
      if (!Array.isArray(parts)) {
        continue;
      }

      const text = parts
        .map((part: any) => (typeof part?.text === "string" ? part.text : ""))
        .join("")
        .trim();

      if (text) {
        return text;
      }
    }

    return "";
  }
}
