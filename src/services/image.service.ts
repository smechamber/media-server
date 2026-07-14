import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

export async function processImage(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    return {
      path: filePath,
    };
  }

  const webpPath = filePath.replace(ext, ".webp");

  let image = sharp(filePath).rotate();

  if (ext === ".webp") {
    const stat = await fs.stat(filePath);

    if (stat.size < 500 * 1024) {
      return {
        path: filePath,
      };
    }
  }

  await image
    .webp({
      quality: 82,
      effort: 6,
    })
    .toFile(webpPath);

  if (webpPath !== filePath) {
    await fs.remove(filePath);
  }

  return {
    path: webpPath,
  };
}