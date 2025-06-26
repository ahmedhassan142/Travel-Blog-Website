import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ||'' ;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing from .env.local");
}

export async function connection() {
  try {
    const options: ConnectOptions = {}; // No more deprecated options

    await mongoose.connect(MONGODB_URI, options);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

