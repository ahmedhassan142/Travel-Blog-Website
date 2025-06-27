import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    // Force new connection
    await mongoose.disconnect();
    
    // Explicit connection with error handling
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'your-database-name' // ⚠️ Add this line explicitly
    });

    // Get native MongoDB driver instance
    const db = conn.connection.db;
    
    // Test database operations
    const collections = await db.listCollections().toArray();

    res.status(200).json({
      status: "Success",
      collections: collections.map(c => c.name),
      stats: await db.stats() // Additional verification
    });

  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
      connectionState: mongoose.connection.readyState,
      suggestion: "1. Verify dbName in connection 2. Check user permissions"
    });
  } finally {
    await mongoose.disconnect();
  }
}