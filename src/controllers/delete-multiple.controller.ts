import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

export async function deleteMultipleController(
  req: Request,
  res: Response
) {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({
      success: false,
      message: "urls array is required",
    });
  }

  const deleted: string[] = [];
  const failed: string[] = [];

  for (const url of urls) {
    try {
      const pathname = new URL(url).pathname;

      const filePath = path.join(
        process.cwd(),
        pathname.replace(/^\/+/, "")
      );

      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        deleted.push(url);
      } else {
        failed.push(url);
      }
    } catch {
      failed.push(url);
    }
  }

  return res.json({
    success: true,
    deletedCount: deleted.length,
    failedCount: failed.length,
    deleted,
    failed,
  });
}