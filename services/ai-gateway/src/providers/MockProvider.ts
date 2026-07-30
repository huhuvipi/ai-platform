import type { AIProvider } from "./AIProvider";

export class MockProvider implements AIProvider {
  async summarize(text: string, language = "Vietnamese"): Promise<string> {
    return Promise.resolve(
      `MOCK SUMMARY (${language}): ${text.slice(0, 60)}${text.length > 60 ? '...' : ''}`
    );
  }
}
