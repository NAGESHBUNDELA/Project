import { http } from "./http";
import type { SubscriptionPlan } from "../types/models";

export const subscriptionService = {
  checkout: (payload: { plan: SubscriptionPlan; charityId?: string; contributionPercent: number }) =>
    http<{ url: string }>("/subscriptions/checkout", { method: "POST", json: payload }),
  cancel: (cancelAt: "immediately" | "period_end") =>
    http<{ message: string }>("/subscriptions/cancel", { method: "POST", json: { cancelAt } }),
};
