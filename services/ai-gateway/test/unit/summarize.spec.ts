import { describe, it, expect } from 'vitest';
import { SummarizeService } from '../../src/services/summarize.service';

describe('SummarizeService', () => {
  it('returns a mock summary when no OPENAI_API_KEY is set', async () => {
    const svc = new SummarizeService();
    const res = await svc.execute('openai', 'This is a test of the summarization flow.');
    expect(res).toMatch(/MOCK SUMMARY:/);
  });
});
