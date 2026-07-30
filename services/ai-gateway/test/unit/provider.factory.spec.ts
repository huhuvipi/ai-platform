import { describe, it, expect } from 'vitest';
import { ProviderFactory } from '../../src/providers/ProviderFactory';
import { env } from '../../src/config/env';

describe('ProviderFactory', () => {
  it('returns MockProvider when OPENAI_API_KEY is not set', () => {
    // Temporarily ensure env has no key
    const had = env.OPENAI_API_KEY;
    (env as any).OPENAI_API_KEY = undefined;

    const provider = ProviderFactory.createProvider('openai');
    expect(provider.summarize).toBeDefined();

    // restore
    (env as any).OPENAI_API_KEY = had;
  });
});
