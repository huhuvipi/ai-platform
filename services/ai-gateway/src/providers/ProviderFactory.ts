import {OpenAIProvider} from "./OpenAIProvider";
import {MockProvider} from "./MockProvider";
import type {AIProvider} from "./AIProvider";
import { env } from "../config/env";

export type ProviderTypeNaame = "openai";

export class ProviderFactory {
  static createProvider(type: ProviderTypeNaame): AIProvider {
    // If no API key is set, use the mock provider for safer local testing
    if (!env.OPENAI_API_KEY) {
      return new MockProvider();
    }

    switch (type) {
      case "openai":
        return new OpenAIProvider();
      default:
        throw new Error(`Unsupported provider type: ${type}`);
    }
  }
}
