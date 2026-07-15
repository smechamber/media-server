import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import uploadRoute from "./routes/upload.route.js";
import path from "path";
import os from "os";
import deleteRoute from "./routes/delete.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";


const app = express();

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((pinoHttp as any)());

app.get("/api/v1/health", async (_, res) => {
  res.json({
    success: true,
    service: "SME Media Server",
    version: "1.0.0",
    uptime: process.uptime(),
    node: process.version,
    platform: process.platform,
    memory: {
      rss: process.memoryUsage().rss,
      heapUsed: process.memoryUsage().heapUsed,
      heapTotal: process.memoryUsage().heapTotal,
    },
    cpu: {
      cores: os.cpus().length,
      load: os.loadavg(),
    },
    timestamp: new Date().toISOString(),
  });
});


app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    maxAge: "365d",
    immutable: true,
    etag: true,
  })
);

app.use("/api/v1/upload", uploadRoute);

app.use("/api/v1/delete", deleteRoute);

app.use(errorMiddleware);


export default app;