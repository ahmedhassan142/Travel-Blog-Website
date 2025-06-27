import connectToDatabase from '../../dbconnect/lib';

export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Reuses existing connection
    res.status(200).json({ status: 'Success' });
  } catch (error) {
    res.status(500).json({ status: 'Failed', error: error.message });
  }
}