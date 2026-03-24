import { http } from "./http";
import type { Charity } from "../types/models";

export const charityService = {
  list: (params: { search?: string; category?: string; isFeatured?: boolean; page?: number; limit?: number }) =>
    http<{ charities: Charity[]; total: number; page: number; limit: number }>("/charities", { params }),
  getBySlug: (slug: string) => http<Charity>(`/charities/${slug}`),
  create: (payload: {
    name: string;
    description: string;
    shortDescription: string;
    category: string;
    isFeatured?: boolean;
  }) => http<Charity>("/charities", { method: "POST", json: payload }),
  update: (
    id: string,
    payload: {
      name?: string;
      description?: string;
      shortDescription?: string;
      category?: string;
      isFeatured?: boolean;
    }
  ) => http<Charity>(`/charities/${id}`, { method: "PATCH", json: payload }),
  remove: (id: string) => http<{ message: string }>(`/charities/${id}`, { method: "DELETE" }),
};
