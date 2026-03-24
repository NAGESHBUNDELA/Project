export type UserRole = "user" | "admin";
export type SubscriptionStatus = "active" | "inactive" | "cancelled" | "lapsed";
export type SubscriptionPlan = "monthly" | "yearly";
export type DrawMode = "random" | "algorithmic";
export type DrawStatus = "draft" | "simulated" | "published";
export type WinTier = "5-match" | "4-match" | "3-match";
export type VerificationStatus = "pending_proof" | "under_review" | "approved" | "rejected";
export type PayoutStatus = "pending" | "paid";

export type Score = {
  _id: string;
  points: number;
  datePlayed: string;
  addedAt?: string;
};

export type Charity = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription: string;
  category: string;
  isFeatured?: boolean;
  events?: Array<{
    _id: string;
    title: string;
    description?: string;
    eventDate: string;
    location?: string;
    imageUrl?: string;
  }>;
};

export type Winner = {
  _id: string;
  tier: WinTier;
  prizeAmount: number;
  verificationStatus: VerificationStatus;
  payoutStatus: PayoutStatus;
  drawId?: { _id?: string; title?: string; month?: number; year?: number; drawnNumbers?: number[] };
  userId?: { _id?: string; name?: string; email?: string };
  proofUrl?: string;
};

export type Draw = {
  _id: string;
  title: string;
  month: number;
  year: number;
  mode: DrawMode;
  status: DrawStatus;
  drawnNumbers: number[];
  winnerCounts?: { fiveMatch: number; fourMatch: number; threeMatch: number };
};

export type AppUser = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  subscription?: {
    status?: SubscriptionStatus;
    plan?: SubscriptionPlan;
    currentPeriodEnd?: string;
  };
  charityContribution?: {
    charityId?: { _id?: string; name?: string; slug?: string };
    contributionPercent?: number;
  };
};
