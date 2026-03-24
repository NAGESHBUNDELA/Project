import { http } from "./http";
import type { Score } from "../types/models";

export const scoreService = {
  list: () => http<Score[]>("/scores"),
  add: (payload: { points: number; datePlayed: string }) =>
    http<Score[]>("/scores", { method: "POST", json: payload }),
  update: (scoreId: string, payload: { points?: number; datePlayed?: string }) =>
    http<Score[]>(`/scores/${scoreId}`, { method: "PATCH", json: payload }),
  remove: (scoreId: string) => http<{ message: string }>(`/scores/${scoreId}`, { method: "DELETE" }),
  adminUpdate: (userId: string, scoreId: string, payload: { points?: number; datePlayed?: string }) =>
    http<Score[]>(`/scores/admin/${userId}/${scoreId}`, { method: "PATCH", json: payload }),
};
