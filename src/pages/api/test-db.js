import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;
    
    res.status(200).json({
      status: 'Success',
      dbState: db.readyState, // 1 = connected, 0 = disconnected
      collections: (await db.db.listCollections().toArray()).map(c => c.name)
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    await mongoose.disconnect();
  }
}