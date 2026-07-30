import {OpenAIProvider} from "./OpenAIProvider";
import {GeminiProvider} from "./GeminiProvider";
import {MockProvider} from "./MockProvider";
import type {AIProvider} from "./AIProvider";
import { env } from "../config/env";

export type ProviderTypeName = "openai" | "gemini";

export class ProviderFactory {
  static createProvider(type: ProviderTypeName): AIProvider {
    // If no API key for any provider is set, use the mock provider for safer local testing
    if (!env.OPENAI_API_KEY && !env.GEMINI_API_KEY) {
      return new MockProvider();
    }

    switch (type) {
      case "openai":
        // fall back to mock if key missing
        return env.OPENAI_API_KEY ? new OpenAIProvider() : new MockProvider();
      case "gemini":
        return env.GEMINI_API_KEY ? new GeminiProvider() : new MockProvider();
      default:
        throw new Error(`Unsupported provider type: ${type}`);
    }
  }
}
