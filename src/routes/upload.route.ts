import { Router } from "express";

import upload from "../middleware/multer.middleware.js";

import { uploadController } from "../controllers/upload.controller.js";

const router = Router();

router.post("/", upload.single("file"), uploadController);

export default router;