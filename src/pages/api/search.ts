import { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/dbconnect/lib';
import blog from '@/schemas/blog';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
await connection()
  if (req.method === 'GET') {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ success: false, message: 'Query parameter is required' });
      }
      
      const blogs = await blog.find({ title: { $regex: query, $options: 'i' } });
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}