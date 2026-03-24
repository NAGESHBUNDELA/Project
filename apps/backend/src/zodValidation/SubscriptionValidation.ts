import { z } from "zod";
import { SubscriptionPlan } from "db/models";

// Checkout 
export const createCheckoutSchema = z.object({
  plan: z.nativeEnum(SubscriptionPlan, {
    message: "Plan is required"
  }),

  charityId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid charity ID")
    .optional(),

  contributionPercent: z
    .number()
    .int()
    .min(10, "Minimum contribution is 10%")
    .max(100, "Contribution cannot exceed 100%")
    .default(10),
});

// cancellating of subscri[ption

export const cancelSubscriptionSchema = z.object({
  cancelAt: z.enum(["immediately", "period_end"]).default("period_end"),
});

export const verifyCheckoutSchema = z.object({
  sessionId: z.string().min(10, "sessionId is required"),
});

//Stripe webhook

export const stripeWebhookSchema = z.object({
  type: z.string({ message: "Event type is required" }),
  data: z.object({
    object: z.record(z.string(), z.unknown()),
  }),
});


export const updateContributionSchema = z.object({
  contributionPercent: z
    .number({ message: "Contribution percentage is required" })
    .int("Contribution must be a whole number")
    .min(10, "Minimum contribution is 10%")
    .max(100, "Contribution cannot exceed 100%"),
});


export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
export type CancelSubscriptionInput = z.infer<typeof cancelSubscriptionSchema>;
export type VerifyCheckoutInput = z.infer<typeof verifyCheckoutSchema>;
export type StripeWebhookInput = z.infer<typeof stripeWebhookSchema>;
export type UpdateContributionInput = z.infer<typeof updateContributionSchema>;