import mongoose, { Document, Schema } from "mongoose";
import {DrawMode, DrawStatus, WinTier, WinnerVerificationStatus, PayoutStatus, type ObjectId,} from "./Types.js";


export interface IPrizePool {
  totalPool: number;
  jackpotTier: number;
  fourMatchTier: number;
  threeMatchTier: number;
  rolloverCarriedIn: number;
  rolloverCarriedOut: number;
  activeSubscriberCount: number;
}

export interface IDrawEntry {
  userId: ObjectId;
  scoresAtDraw: number[];
  matchCount: number;
  tier: WinTier | null;
  prizeAmount: number;
}

export interface IDraw extends Document {
  title: string;
  month: number;
  year: number;
  mode: DrawMode;
  drawnNumbers: number[];
  status: DrawStatus;
  prizePool: IPrizePool;
  entries: IDrawEntry[];
  winnerCounts: {
    fiveMatch: number;
    fourMatch: number;
    threeMatch: number;
  };
  publishedBy?: ObjectId;
  publishedAt?: Date;
  simulatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWinner extends Document {
  userId: ObjectId;
  drawId: ObjectId;
  tier: WinTier;
  matchedNumbers: number[];
  scoresAtDraw: number[];
  prizeAmount: number;
  verificationStatus: WinnerVerificationStatus;
  proofUrl?: string;
  adminNote?: string;
  reviewedBy?: ObjectId;
  reviewedAt?: Date;
  payoutStatus: PayoutStatus;
  paidAt?: Date;
  paidBy?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const PrizePoolSchema = new Schema<IPrizePool>(
  {
    totalPool: { type: Number, required: true },
    jackpotTier: { type: Number, required: true },
    fourMatchTier: { type: Number, required: true },
    threeMatchTier: { type: Number, required: true },
    rolloverCarriedIn: { type: Number, default: 0 },
    rolloverCarriedOut: { type: Number, default: 0 },
    activeSubscriberCount: { type: Number, required: true },
  },
  { _id: false }
);

const DrawEntrySchema = new Schema<IDrawEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    scoresAtDraw: { type: [Number], required: true },
    matchCount: { type: Number, required: true },
    tier: { type: String, enum: [...Object.values(WinTier), null], default: null },
    prizeAmount: { type: Number, default: 0 },
  },
  { _id: true }
);

// ─── Draw Schema 
const DrawSchema = new Schema<IDraw>(
  {
    title: { type: String, required: true, trim: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    mode: { type: String, enum: Object.values(DrawMode), default: DrawMode.Random },
    drawnNumbers: { type: [Number], default: [] },
    status: { type: String, enum: Object.values(DrawStatus), default: DrawStatus.Draft },
    prizePool: { type: PrizePoolSchema, default: null },
    entries: { type: [DrawEntrySchema], default: [] },
    winnerCounts: {
      fiveMatch: { type: Number, default: 0 },
      fourMatch: { type: Number, default: 0 },
      threeMatch: { type: Number, default: 0 },
    },
    publishedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    publishedAt: { type: Date, default: null },
    simulatedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


DrawSchema.index({ year: 1, month: 1 }, { unique: true });
DrawSchema.index({ status: 1 });


const WinnerSchema = new Schema<IWinner>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    drawId: { type: Schema.Types.ObjectId, ref: "Draw", required: true },
    tier: { type: String, enum: Object.values(WinTier), required: true },
    matchedNumbers: { type: [Number], required: true },
    scoresAtDraw: { type: [Number], required: true },
    prizeAmount: { type: Number, required: true },
    verificationStatus: { type: String, enum: Object.values(WinnerVerificationStatus), default: WinnerVerificationStatus.PendingProof },
    proofUrl: { type: String, default: null },
    adminNote: { type: String, default: null },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    reviewedAt: { type: Date, default: null },
    payoutStatus: { type: String, enum: Object.values(PayoutStatus), default: PayoutStatus.Pending },
    paidAt: { type: Date, default: null },
    paidBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//indexes
WinnerSchema.index({ drawId: 1, userId: 1 });
WinnerSchema.index({ verificationStatus: 1 });
WinnerSchema.index({ payoutStatus: 1 });
WinnerSchema.index({ userId: 1 });


export const Draw = mongoose.model<IDraw>("Draw", DrawSchema);
export const Winner = mongoose.model<IWinner>("Winner", WinnerSchema);