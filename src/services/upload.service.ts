import path from "path";
import fs from "fs/promises";
import { processImage } from "./image.service.js";
import { getFileType } from "../utils/file.utils.js";

export async function uploadService(file: Express.Multer.File) {
  const type = getFileType(file.mimetype);

  let finalPath = file.path;

  if (type === "image") {
    const image = await processImage(file.path);
    finalPath = image.path;
  }

  const base = process.env.MEDIA_BASE_URL ?? "http://localhost:5000";

  const folder = path.basename(path.dirname(finalPath));
  const filename = path.basename(finalPath);

  return {
    success: true,
    id: filename.split(".")[0],
    filename,
    originalName: file.originalname,
    folder,
    mimeType: file.mimetype,
    size: (await fs.stat(finalPath)).size,
    url: `${base}/uploads/${folder}/${filename}`,
    secureUrl: `${base}/uploads/${folder}/${filename}`,
  };
}