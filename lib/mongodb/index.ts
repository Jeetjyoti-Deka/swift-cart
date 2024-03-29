import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error("Mongodb URI is missing");

  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "Swift-Cart",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
