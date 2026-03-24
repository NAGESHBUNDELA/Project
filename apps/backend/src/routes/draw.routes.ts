import { Router } from "express";
import * as DrawController from "../controllers/draw.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { createDrawSchema } from "../zodValidation/AdminValidation.js";

const router: Router = Router();

// Admin
router.post("/", requireAuth, requireAdmin, validateBody(createDrawSchema), DrawController.createDraw);
router.get("/", requireAuth, requireAdmin, DrawController.getAllDraws);
router.get("/:id", requireAuth, requireAdmin, DrawController.getDrawById);
router.post("/:id/simulate", requireAuth, requireAdmin, DrawController.simulateDraw);
router.post("/:id/publish", requireAuth, requireAdmin, DrawController.publishDraw);

export default router;