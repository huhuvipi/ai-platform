import pino from "pino";

const transport =
  process.env.NODE_ENV === "development"
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      }
    : undefined;

export const logger = pino(transport ? { transport } : {});