import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connections[0].readyState === 1) {
    console.log("Already connected to DB");
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error("Invalid MONGO_URI format. Must start with mongodb:// or mongodb+srv://");
  }

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // 30 ثانیه timeout به جای 10 ثانیه پیش‌فرض
      socketTimeoutMS: 45000, // 45 ثانیه برای socket timeout
      connectTimeoutMS: 30000, // 30 ثانیه برای اتصال اولیه
      retryWrites: true,
      retryReads: true,
    });
    console.log("✅ Successfully connected to MongoDB");
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
}

export default connectDB;