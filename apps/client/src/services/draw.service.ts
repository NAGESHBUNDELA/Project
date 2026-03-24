import { http } from "./http";
import type { Draw, DrawMode } from "../types/models";

export const drawService = {
  list: () => http<Draw[]>("/draws"),
  getById: (id: string) => http<Draw>(`/draws/${id}`),
  create: (payload: { title: string; month: number; year: number; mode: DrawMode }) =>
    http<Draw>("/draws", { method: "POST", json: payload }),
  simulate: (id: string) => http<{ draw: Draw }>("/draws/" + id + "/simulate", { method: "POST" }),
  publish: (id: string) => http<Draw>("/draws/" + id + "/publish", { method: "POST" }),
};
