import { Router } from "express";
import * as WinnerController from "../controllers/winner.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { verifyWinnerSchema } from "../zodValidation/AdminValidation.js";

const router: Router = Router();

// User
router.get("/me", requireAuth, WinnerController.getMyWinnings);
router.patch("/:id/proof", requireAuth, WinnerController.uploadProof);

// Admin
router.get("/", requireAuth, requireAdmin, WinnerController.getAllWinners);
router.patch("/:id/verify", requireAuth, requireAdmin, validateBody(verifyWinnerSchema), WinnerController.verifyWinner);
router.patch("/:id/pay", requireAuth, requireAdmin, WinnerController.markAsPaid);

export default router;