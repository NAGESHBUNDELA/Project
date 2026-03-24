import { http } from "./http";
import type { AppUser } from "../types/models";

export const userService = {
  myProfile: () => http<AppUser>("/users/me/profile"),
  updateMyProfile: (payload: { name?: string; avatarUrl?: string | null }) =>
    http<AppUser>("/users/me/profile", { method: "PATCH", json: payload }),
  all: (page = 1, limit = 20) =>
    http<{ users: AppUser[]; total: number; page: number; limit: number }>("/users", {
      params: { page, limit },
    }),
  byId: (id: string) => http<AppUser>(`/users/${id}`),
  adminUpdateUser: (id: string, payload: { name?: string; role?: "user" | "admin"; avatarUrl?: string | null }) =>
    http<AppUser>(`/users/${id}`, { method: "PATCH", json: payload }),
  adminUpdateSubscription: (
    id: string,
    payload: { plan?: "monthly" | "yearly"; status?: "active" | "inactive" | "cancelled" | "lapsed"; currentPeriodEnd?: string | null }
  ) => http<AppUser>(`/users/${id}/subscription`, { method: "PATCH", json: payload }),
};
