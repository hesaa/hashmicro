import swaggerUi from "swagger-ui-express";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "@/routes";
import { errorHandler } from "@/middleware/error.middleware";
import swaggerSpec from "@/config/swagger";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "UP", timestamp: new Date().toISOString() });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Hashmicro Test API Docs",
}));
app.get("/api-docs.json", (_req: Request, res: Response) => {
  res.json(swaggerSpec);
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
