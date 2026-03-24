import { http } from "./http";
import type { Winner, VerificationStatus } from "../types/models";

export const winnerService = {
  myWinnings: () => http<Winner[]>("/winners/me"),
  all: () => http<Winner[]>("/winners"),
  uploadProof: (id: string, proofUrl: string) =>
    http<Winner>(`/winners/${id}/proof`, { method: "PATCH", json: { proofUrl } }),
  verify: (id: string, verificationStatus: Extract<VerificationStatus, "approved" | "rejected">) =>
    http<Winner>(`/winners/${id}/verify`, { method: "PATCH", json: { verificationStatus } }),
  pay: (id: string) => http<Winner>(`/winners/${id}/pay`, { method: "PATCH" }),
};
