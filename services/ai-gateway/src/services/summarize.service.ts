import {ProviderFactory} from "../providers/ProviderFactory";

export class SummarizeService {
  async execute(provider: "openai", text: string): Promise<string> {
    const ai = ProviderFactory.createProvider(provider);
    return ai.summarize(text);
  }
}