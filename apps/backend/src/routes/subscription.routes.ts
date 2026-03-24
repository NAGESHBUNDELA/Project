import { Router } from "express";
import express from "express";
import * as SubscriptionController from "../controllers/subscription.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import {
  createCheckoutSchema,
  cancelSubscriptionSchema,
  verifyCheckoutSchema,
} from "../zodValidation/SubscriptionValidation.js";

const router: Router = Router();

router.get("/prices", SubscriptionController.getPublicPrices);

// User
router.post("/checkout", requireAuth, validateBody(createCheckoutSchema), SubscriptionController.createCheckout);
router.post(
  "/verify-checkout",
  requireAuth,
  validateBody(verifyCheckoutSchema),
  SubscriptionController.verifyCheckout
);
router.post("/cancel", requireAuth, validateBody(cancelSubscriptionSchema), SubscriptionController.cancelSubscription);

// Stripe webhook
router.post("/webhook", express.raw({ type: "application/json" }), SubscriptionController.stripeWebhook);

export default router;