import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import ContactSubmission from '@/schemas/contact'; // adjust path as needed

const uri = process.env.MONGODB_URI!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB using Mongoose
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri);
    }

    // Create and save the document
    const submission = new ContactSubmission({
      name,
      email,
      message
      // createdAt and status will be set automatically by the schema
    });

    const savedSubmission = await submission.save();

    return NextResponse.json({
      success: true,
      id: savedSubmission._id
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}