import { connectDB } from '../../lib/db'; // Import named export

export default async function handler(req, res) {
  try {
    await connectDB(); // Use the connection
    
    // Test MongoDB connection
    const db = mongoose.connection;
    const collections = await db.db.listCollections().toArray();

    res.status(200).json({
      status: "Success",
      collections: collections.map(c => c.name)
    });
    
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
}