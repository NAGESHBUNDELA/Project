import mongoose from "mongoose";


export enum UserRole {
  User = "user",
  Admin = "admin",
}

export enum SubscriptionPlan {
  Monthly = "monthly",
  Yearly = "yearly",
}

export enum SubscriptionStatus {
  Active = "active",
  Inactive = "inactive",
  Cancelled = "cancelled",
  Lapsed = "lapsed",
}

export enum WinTier {
  Match5 = "5-match",
  Match4 = "4-match",
  Match3 = "3-match",
}

export enum PayoutStatus {
  Pending = "pending",
  Paid = "paid",
}

export enum DrawMode {
  Random = "random",
  Algorithmic = "algorithmic",
}

export enum DrawStatus {
  Draft = "draft",
  Simulated = "simulated",
  Published = "published",
}

export enum WinnerVerificationStatus {
  PendingProof = "pending_proof",
  UnderReview = "under_review",
  Approved = "approved",
  Rejected = "rejected",
}

export enum CharityCategory {
  Health = "health",
  Education = "education",
  Environment = "environment",
  Sports = "sports",
  Community = "community",
  Animals = "animals",
  Arts = "arts",
  Other = "other",
}

export type ObjectId = mongoose.Types.ObjectId;