'use client';

import { useMemo, useState } from 'react';
import { NetworkServices } from '@/networkings/core/network_services';

export default function HomePage() {
  const aiService = useMemo(
    () => new NetworkServices(),
    [],
  );

  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const response = await aiService.summarize({
        provider: 'gemini',
        text,
        language: 'English',
      });

      setResult(response.result);
    } catch (e) {
      setResult(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

        <h1 className="text-3xl font-bold text-center text-slate-900">
          AI Summarize
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-6">
          Tóm tắt ghi chú bằng AI Gateway
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập ghi chú của bạn..."
          className="w-full h-48 rounded-xl border border-slate-300 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={summarize}
          disabled={loading}
          className="mt-4 w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Đang xử lý...' : 'Tóm tắt bằng AI'}
        </button>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 min-h-[180px]">

          <h2 className="font-semibold text-slate-900 mb-3">
            Kết quả
          </h2>

          {result ? (
            <pre className="whitespace-pre-wrap text-slate-800">
              {result}
            </pre>
          ) : (
            <p className="text-slate-400">
              Chưa có kết quả
            </p>
          )}
        </div>
      </div>
    </main>
  );
}