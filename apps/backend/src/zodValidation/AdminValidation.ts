import { z } from "zod";
import { DrawMode, SubscriptionPlan, SubscriptionStatus, WinnerVerificationStatus } from "db/models";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const mongoIdSchema = z
  .string({ message: "ID is required" })
  .regex(/^[a-f\d]{24}$/i, "Invalid ID format");

// Draw 
export const createDrawSchema = z.object({
  title: z
    .string({ message: "Draw title is required" })
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title cannot exceed 150 characters"),

  month: z
    .number({ message: "Month is required" })
    .int()
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),

  year: z
    .number({ message: "Year is required" })
    .int()
    .min(2024, "Year must be 2024 or later"),

  mode: z.nativeEnum(DrawMode, {
    message: "Draw mode is required"
  }),
});

export const publishDrawSchema = z.object({
  drawId: mongoIdSchema,
});

//Winner verification
export const verifyWinnerSchema = z.object({
  verificationStatus: z.enum(
    [WinnerVerificationStatus.Approved, WinnerVerificationStatus.Rejected],
    { message: "Verification status is required" }
  ),
  adminNote: z
    .string()
    .trim()
    .max(500, "Admin note cannot exceed 500 characters")
    .optional(),
});

export const updatePayoutSchema = z.object({
  winnerId: mongoIdSchema,
});

//User management (admin actions) 
export const adminUpdateUserSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  role: z.enum(["user", "admin"]).optional(),
  avatarUrl: z.string().url("Invalid avatar URL").optional().nullable(),
});

export const adminUpdateScoreSchema = z.object({
  points: z.number().int().min(1).max(45).optional(),
  datePlayed: z
    .string()
    .date("Please enter a valid date (YYYY-MM-DD)")
    .optional(),
});

export const adminUpdateSubscriptionSchema = z.object({
  plan: z.nativeEnum(SubscriptionPlan).optional(),
  status: z.nativeEnum(SubscriptionStatus).optional(),
  currentPeriodEnd: z.string().datetime().optional().nullable(),
});


export type PaginationInput = z.infer<typeof paginationSchema>;
export type CreateDrawInput = z.infer<typeof createDrawSchema>;
export type PublishDrawInput = z.infer<typeof publishDrawSchema>;
export type VerifyWinnerInput = z.infer<typeof verifyWinnerSchema>;
export type UpdatePayoutInput = z.infer<typeof updatePayoutSchema>;
export type AdminUpdateUserInput = z.infer<typeof adminUpdateUserSchema>;
export type AdminUpdateScoreInput = z.infer<typeof adminUpdateScoreSchema>;
export type AdminUpdateSubscriptionInput = z.infer<typeof adminUpdateSubscriptionSchema>;