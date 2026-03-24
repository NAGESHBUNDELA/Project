import { z } from "zod";

// auth
export const signupSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string({ message: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password cannot exceed 72 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  password: z.string({ message: "Password is required" }).min(1, "Password is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string({ message: "Current password is required" }).min(1),
    newPassword: z
      .string({ message: "New password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password cannot exceed 72 characters"),
    confirmPassword: z.string({ message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

//Profile 
export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  avatarUrl: z.string().url("Invalid avatar URL").optional().nullable(),
});

//scores
export const addScoreSchema = z.object({
  points: z
    .number({ message: "Score is required" })
    .int("Score must be a whole number")
    .min(1, "Stableford score must be at least 1")
    .max(45, "Stableford score cannot exceed 45"),

  datePlayed: z
    .string({ message: "Date played is required" })
    .date("Please enter a valid date (YYYY-MM-DD)")
    .refine((val) => new Date(val) <= new Date(), {
      message: "Date played cannot be in the future",
    }),
});

export const updateScoreSchema = addScoreSchema.partial();

// charity contribution of the user
export const updateCharityContributionSchema = z.object({
  charityId: z
    .string({ message: "Charity ID is required" })
    .regex(/^[a-f\d]{24}$/i, "Invalid charity ID"),

  contributionPercent: z
    .number({ message: "Contribution percentage is required" })
    .int("Contribution must be a whole number")
    .min(10, "Minimum contribution is 10%")
    .max(100, "Contribution cannot exceed 100%"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type AddScoreInput = z.infer<typeof addScoreSchema>;
export type UpdateScoreInput = z.infer<typeof updateScoreSchema>;
export type UpdateCharityContributionInput = z.infer<typeof updateCharityContributionSchema>;