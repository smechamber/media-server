import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import uploadRoute from "./routes/upload.route.js";
import path from "path";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(pinoHttp());

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Media Server Running 🚀",
  });
});


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1/upload", uploadRoute);



export default app;