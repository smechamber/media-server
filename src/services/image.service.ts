import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

export async function processImage(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  if (
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".png" &&
    ext !== ".webp"
  ) {
    return filePath;
  }

  const webpPath = filePath.replace(ext, ".webp");

  const metadata = await sharp(filePath).metadata();

  let image = sharp(filePath).rotate();

  if ((metadata.width ?? 0) > 1920) {
    image = image.resize({
      width: 1920,
      withoutEnlargement: true,
    });
  }

  if (ext === ".webp") {
    const stat = await fs.stat(filePath);

    // Already optimized (<500KB)
    if (stat.size < 500 * 1024) {
      return filePath;
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

  return webpPath;
}