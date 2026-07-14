import { Request, Response } from "express";
import { uploadService } from "../services/upload.service.js";

export const uploadController = async (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
    });
  }

  const result = await uploadService(req.file);

  res.json({
    success: true,
    ...result,
  });
};