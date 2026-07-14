import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { deleteController } from "../controllers/delete.controller.js";
import { deleteLimiter } from "../middleware/rate-limit.middleware.js";
import { deleteMultipleController } from "../controllers/delete-multiple.controller.js";

const router = Router();

router.delete(
  "/",
  authMiddleware,
  deleteLimiter,
  deleteController
);

router.delete(
  "/multiple",
  authMiddleware,
  deleteMultipleController
);

export default router;