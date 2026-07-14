import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { deleteController } from "../controllers/delete.controller.js";
import { deleteLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.delete(
  "/",
  authMiddleware,
  deleteLimiter,
  deleteController
);

export default router;