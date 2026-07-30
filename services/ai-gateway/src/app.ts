import express from "express";
import healthRoute from "./routes/health.route";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

// Mount API routes under /v1 for versioning
app.use("/v1", healthRoute);

app.use(errorMiddleware as express.ErrorRequestHandler);

export default app;