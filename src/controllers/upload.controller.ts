import { Request, Response } from "express";
import { uploadService } from "../services/upload.service.js";
import { logger } from "../utils/logger.utils.js";

export const uploadController = async (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const start = Date.now();

  const result = await uploadService(req.file);

  logger.info({
    event: "UPLOAD",
    folder: result.folder,
    filename: result.filename,
    mimeType: result.mimeType,
    size: result.size,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    duration: `${Date.now() - start}ms`,
  });

  return res.json(result);
};