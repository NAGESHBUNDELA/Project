import { Router } from "express";
import * as CharityController from "../controllers/charity.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { validateBody, validateQuery } from "../middleware/validate.middleware.js";
import {
  createCharitySchema,
  updateCharitySchema,
  addCharityEventSchema,
  updateCharityEventSchema,
  charityQuerySchema,
} from "../zodValidation/CharityValidation.js";

const router: Router = Router();

// Public
router.get("/", validateQuery(charityQuerySchema), CharityController.getAllCharities);
router.get("/:slug", CharityController.getCharityBySlug);

// Admin
router.post("/", requireAuth, requireAdmin, validateBody(createCharitySchema), CharityController.createCharity);
router.patch("/:id", requireAuth, requireAdmin, validateBody(updateCharitySchema), CharityController.updateCharity);
router.delete("/:id", requireAuth, requireAdmin, CharityController.deleteCharity);

// Charity events (Admin)
router.post("/:id/events", requireAuth, requireAdmin, validateBody(addCharityEventSchema), CharityController.addEvent);
router.patch("/:id/events/:eventId", requireAuth, requireAdmin, validateBody(updateCharityEventSchema), CharityController.updateEvent);
router.delete("/:id/events/:eventId", requireAuth, requireAdmin, CharityController.deleteEvent);

export default router;