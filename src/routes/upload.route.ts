import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadController } from "../controllers/upload.controller.js";
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



export default router;