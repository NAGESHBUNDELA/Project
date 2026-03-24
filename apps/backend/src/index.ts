import express, { type Express } from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import scoreRoutes from "./routes/score.routes.js";
import charityRoutes from "./routes/charity.routes.js";
import drawRoutes from "./routes/draw.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import winnerRoutes from "./routes/winner.routes.js";

const app: Express = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/golfc";

app.use((req, res, next) => {
  if (req.originalUrl === "/api/subscriptions/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/charities", charityRoutes);
app.use("/api/draws", drawRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/winners", winnerRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", pid: process.pid });
});

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`[Worker ${process.pid}] Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`[Worker ${process.pid}] Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(`[Worker ${process.pid}] Failed to start:`, err);
    process.exit(1);
  }
};
start();

export default app;