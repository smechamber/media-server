import multer from "multer";
import path from "path";
import fs from "fs-extra";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
  destination: async (req: any, file, cb) => {
    const folder = (req.body.folder || "images").toLowerCase();

    const uploadPath = path.join(process.cwd(), "uploads", folder);

    await fs.ensureDir(uploadPath);

    cb(null, uploadPath);
  },

  filename(req: any, file, cb) {
    cb(null, randomUUID() + path.extname(file.originalname));
  },
});

export default multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});