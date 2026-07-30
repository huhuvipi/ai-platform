export interface AIProvider {
  summarize(text: string): Promise<string>;
}