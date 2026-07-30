# ai-gateway

Minimal instructions to run the ai-gateway service locally.

Environment
- Copy `.env.example` to `.env` and set `OPENAI_API_KEY` if you want OpenAI features.

Run (development)
```bash
cd services/ai-gateway
npm install
npm run dev
```

Run (production)
```bash
cd services/ai-gateway
npm run build   # if you add a build step
npm start
```

Notes
- When `OPENAI_API_KEY` is not set a startup warning is logged and OpenAI-based features will be disabled.
