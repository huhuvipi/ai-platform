import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";

if (!env.OPENAI_API_KEY) {
  logger.warn(
    "OPENAI_API_KEY is not set — OpenAI features will be disabled or limited."
  );
}

app.listen(Number(env.PORT), () => {
  logger.info(`AI Gateway running at http://localhost:${env.PORT}`);
});