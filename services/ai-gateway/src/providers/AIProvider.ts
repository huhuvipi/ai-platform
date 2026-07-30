export interface AIProvider {
  summarize(text: string, language?: string): Promise<string>;
}
