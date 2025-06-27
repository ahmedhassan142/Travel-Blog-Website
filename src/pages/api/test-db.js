// lib/db.js
import mongoose from 'mongoose';

const conn = {
  isConnected: false
};

export async function connectDB() {
  if (conn.isConnected) return;

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4 // Force IPv4
  });

  conn.isConnected = db.connections[0].readyState;
}

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Error:', err);
});