import dotenv from "dotenv";
import { resolve } from "node:path";
import process from "node:process";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User, UserRole } from "db/models";

// Load .env from the same candidate paths as index.ts
dotenv.config({ path: resolve(process.cwd(), ".env"), override: false });
dotenv.config({ path: resolve(process.cwd(), "apps/backend/.env"), override: false });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI is not set. Please check your .env file.");
  process.exit(1);
}

const seedAdmin = async (): Promise<void> => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const existing = await User.findOne({ email: "admin@golfcharity.com" });

  if (existing) {
    console.log("Admin user already exists (admin@golfcharity.com). Skipping.");
  } else {
    await User.create({
      name: "Platform Admin",
      email: "admin@golfcharity.com",
      passwordHash: bcrypt.hashSync("Admin@1234", 12),
      role: UserRole.Admin,
      subscription: { plan: "monthly", status: "active" },
    });
    console.log("Admin user created: admin@golfcharity.com / Admin@1234");
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
