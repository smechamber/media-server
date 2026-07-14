import { Request, Response } from "express";
import { uploadService } from "../services/upload.service.js";

export async function uploadMultipleController(
  req: Request,
  res: Response
) {
  const files = req.files as Express.Multer.File[];

  if (!files?.length) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  const uploaded = await Promise.all(
    files.map(uploadService)
  );

  return res.json({
    success: true,
    count: uploaded.length,
    files: uploaded,
  });
}