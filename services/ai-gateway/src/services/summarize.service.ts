import {ProviderFactory, ProviderTypeName} from "../providers/ProviderFactory";

export class SummarizeService {
  async execute(provider: ProviderTypeName, text: string, language?: string): Promise<string> {
    const ai = ProviderFactory.createProvider(provider);
    return ai.summarize(text, language);
  }
}
