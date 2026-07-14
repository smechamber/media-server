import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";
import { logger } from "../utils/logger.utils.js";

export async function deleteController(req: Request, res: Response) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "URL is required",
    });
  }

  const filePath = path.join(process.cwd(), url.replace(/^\/+/, ""));

  if (!(await fs.pathExists(filePath))) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  await fs.remove(filePath);

  logger.info({
    event: "DELETE",
    url,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  return res.json({
    success: true,
    message: "File deleted successfully",
  });
}