import path from "path";
import { processImage } from "./image.service.js";

export async function uploadService(file: Express.Multer.File) {
  const finalPath = await processImage(file.path);

  return {
    filename: path.basename(finalPath),

    url: `/uploads/${path.basename(path.dirname(finalPath))}/${path.basename(
      finalPath
    )}`,
  };
}