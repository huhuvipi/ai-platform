import type { AIProvider } from "./AIProvider";

export class MockProvider implements AIProvider {
  async summarize(text: string): Promise<string> {
    return Promise.resolve(
      `MOCK SUMMARY: ${text.slice(0, 60)}${text.length > 60 ? '...' : ''}`
    );
  }
}
