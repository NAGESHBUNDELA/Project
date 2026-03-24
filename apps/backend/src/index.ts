import express , {type Express } from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import scoreRoutes from "./routes/score.routes.js";

const app : Express = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/golfc";

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);

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
