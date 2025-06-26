// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import ContactSubmission from '@/schemas/contact';

const uri = process.env.MONGODB_URI!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('--- CONTACT SUBMISSION STARTED ---');

  if (req.method !== 'POST') {
    console.log('Rejected non-POST method:', req.method);
    return res.status(405).json({ 
      success: false, 
      error: 'Method Not Allowed' 
    });
  }

  try {
    // 1. Input validation
    console.log('Validating input...');
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.warn('Missing required fields:', { name, email, message });
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // 2. Database connection
    console.log('Establishing DB connection...');
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri);
      console.log('DB connection established');
    }

    // 3. Create submission
    console.log('Creating new contact submission...');
    const submission = new ContactSubmission({
      name,
      email,
      message
    });

    // 4. Save to database
    console.log('Saving submission...');
    const savedSubmission = await submission.save();
    console.log('Submission saved with ID:', savedSubmission._id);

    // 5. Success response
    return res.status(200).json({ 
      success: true,
      id: savedSubmission._id
    });

  } catch (error) {
    console.error('CONTACT SUBMISSION ERROR:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to save submission',
      details: error instanceof Error ? error.message : undefined
    });
  } finally {
    console.log('--- CONTACT SUBMISSION COMPLETED ---');
  }
}

// Disable body parsing (if using formidable for file uploads later)
export const config = {
  api: {
    bodyParser: true, // Set to false if handling multipart/form-data
  },
};