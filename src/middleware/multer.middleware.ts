import multer from "multer";
import path from "path";
import fs from "fs-extra";
import { randomUUID } from "crypto";
import { getFileType } from "../utils/file.utils.js";

const storage = multer.diskStorage({
  destination: async (req: any, file, cb) => {
  const type = getFileType(file.mimetype);

  if (!type) {
    return cb(new Error("Unsupported file type"), "");
  }

  let folder = "";

  switch (type) {
    case "image":
      folder = "images";
      break;

    case "video":
      folder = "videos";
      break;

    case "document":
      folder = "documents";
      break;

    default:
      return cb(new Error("Unsupported file type"), "");
  }

  const uploadPath = path.join(
    process.cwd(),
    "uploads",
    folder
  );

  await fs.ensureDir(uploadPath);

  cb(null, uploadPath);
},

  filename(req, file, cb) {
    cb(null, randomUUID() + path.extname(file.originalname));
  },
});

export default multer({
  storage,

  limits: {
    fileSize: 200 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    const type = getFileType(file.mimetype);

    if (!type) {
      return cb(new Error("Unsupported file"));
    }

    cb(null, true);
  },
});