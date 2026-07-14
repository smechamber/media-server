import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadController } from "../controllers/upload.controller.js";
import { uploadMultipleController } from "../controllers/upload-multiple.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { uploadLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadLimiter,
  upload.single("file"),
  uploadController
);

router.post(
  "/multiple",
  authMiddleware,
  uploadLimiter,
  upload.array("files", 100),
  uploadMultipleController
);

export default router;