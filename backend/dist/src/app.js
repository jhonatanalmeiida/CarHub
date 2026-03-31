import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env.js";
import { requestLogger } from "./common/middleware/request-logger.js";
import { errorHandler } from "./common/filters/error-handler.js";
import { authRouter } from "./modules/auth/auth.controller.js";
import { brandsRouter } from "./modules/brands/brands.controller.js";
import { modelsRouter } from "./modules/models/models.controller.js";
import { vehiclesRouter } from "./modules/vehicles/vehicles.controller.js";
import { favoritesRouter } from "./modules/favorites/favorites.controller.js";
import { comparisonsRouter } from "./modules/comparisons/comparisons.controller.js";
import { healthRouter } from "./modules/health/health.controller.js";
import { swaggerSpec } from "./swagger/swagger.js";
export const app = express();
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(requestLogger);
app.get("/", (_req, res) => {
    res.json({
        name: "CarHub Cloud API",
        version: "1.0.0",
        docs: "/api-docs"
    });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/models", modelsRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/comparisons", comparisonsRouter);
app.use("/api/health", healthRouter);
app.use(errorHandler);
