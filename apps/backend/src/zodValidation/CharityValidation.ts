import { z } from "zod";
import { CharityCategory } from "db/models";


export const createCharitySchema = z.object({
  name: z
    .string({ message: "Charity name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(150, "Name cannot exceed 150 characters"),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    )
    .optional(), 

  description: z
    .string({ message: "Description is required" })
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description cannot exceed 5000 characters"),

  shortDescription: z
    .string({ message: "Short description is required" })
    .trim()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description cannot exceed 200 characters"),

  category: z.nativeEnum(CharityCategory, {
    message: "Category is required"
  }),

  websiteUrl: z.string().url("Invalid website URL").optional().nullable(),
  registrationNumber: z.string().trim().max(50).optional().nullable(),
  logoUrl: z.string().url("Invalid logo URL").optional().nullable(),
  coverImageUrl: z.string().url("Invalid cover image URL").optional().nullable(),
  galleryImages: z.array(z.string().url("Invalid image URL")).max(10, "Maximum 10 gallery images").default([]),
  tags: z.array(z.string().trim().max(30)).max(10, "Maximum 10 tags").default([]),
  contactName: z.string().trim().max(100).optional().nullable(),
  contactEmail: z.string().trim().toLowerCase().email("Invalid contact email").optional().nullable(),
  isFeatured: z.boolean().default(false),
});

export const updateCharitySchema = createCharitySchema
  .omit({ slug: true })       
  .partial();

// Charity events
export const addCharityEventSchema = z.object({
  title: z
    .string({ message: "Event title is required" })
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title cannot exceed 150 characters"),

  description: z.string().trim().max(1000).optional().nullable(),

  eventDate: z
    .string({ message: "Event date is required" })
    .date("Please enter a valid date (YYYY-MM-DD)")
    .refine((val) => new Date(val) >= new Date(), {
      message: "Event date must be in the future",
    }),

  location: z.string().trim().max(200).optional().nullable(),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
});

export const updateCharityEventSchema = addCharityEventSchema.partial();


export const charityQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  category: z.nativeEnum(CharityCategory).optional(),
  isFeatured: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});


export type CreateCharityInput = z.infer<typeof createCharitySchema>;
export type UpdateCharityInput = z.infer<typeof updateCharitySchema>;
export type AddCharityEventInput = z.infer<typeof addCharityEventSchema>;
export type UpdateCharityEventInput = z.infer<typeof updateCharityEventSchema>;
export type CharityQueryInput = z.infer<typeof charityQuerySchema>;