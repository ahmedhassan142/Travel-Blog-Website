import mongoose from 'mongoose';

export default async function handler(req, res) {
  // Close any existing connections
  await mongoose.disconnect();

  try {
    // Add connection timeout (5 seconds)
    mongoose.set('bufferCommands', false); // Disable command buffering
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    // Get raw MongoDB driver instance
    const mongoDb = conn.connection.db;
    
    // Test listCollections
    const collections = await mongoDb.listCollections().toArray();

    res.status(200).json({
      status: "Success",
      dbState: mongoose.connection.readyState, // 1 = connected
      collections: collections.map(c => c.name)
    });

  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
      connectionString: process.env.MONGODB_URI 
        ? process.env.MONGODB_URI.substring(0, 30) + '...' 
        : 'MONGODB_URI not found',
      suggestion: "Check: 1) IP whitelist 2) Connection string 3) Database user permissions"
    });
  } finally {
    await mongoose.disconnect();
  }
}