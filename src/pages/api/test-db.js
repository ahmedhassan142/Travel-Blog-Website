import mongoose from 'mongoose';

export default async function handler(req, res) {
  await mongoose.disconnect(); // Reset connection

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    const collections = await conn.connection.db.listCollections().toArray();

    res.status(200).json({
      status: "Success",
      dbState: conn.connection.readyState,
      collections: collections.map(c => c.name),
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
      suggestion: "1) Check Atlas IP whitelist 2) Verify MONGODB_URI in Vercel",
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  } finally {
    await mongoose.disconnect();
  }
}