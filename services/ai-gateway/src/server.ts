import express from 'express';

const app = express();
const port = 3000;

app.get("/v1/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "ai-gateway"
  });
});

app.listen(port, () => {
  console.log(`AI Gateway running at http://localhost:${port}`);
});