// pages/api/destinations/[slug].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import  { connectToDatabase } from "@/lib/db";
import destination from '@/schemas/destination'

const handler=async(
  req: NextApiRequest,
  res: NextApiResponse
)=> {
  console.log('--- API CALL STARTED ---') // Debug log

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    // 1. Verify connection
    console.log('Connecting to DB...')
    await connectToDatabase()
    console.log('DB connected')

    // 2. Verify parameter
    const { slug } = req.query
    console.log('Fetching slug:', slug)
    
    if (!slug) {
      return res.status(400).json({ error: 'Slug parameter required' })
    }

    // 3. Simple test response (comment out DB code first)
    // return res.status(200).json({ test: 'success' })

    // 4. Actual database query
    const result = await destination.findOne({ 
      slug: slug 
    }).lean().exec()

    console.log('Query result:', result)
    
    if (!result) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    return res.status(200).json({data:result})
    
  } catch (error) {
    console.error('API ERROR:', error)
    return res.status(500).json({ error: 'Internal server error' })
  } finally {
    console.log('--- API CALL COMPLETED ---')
  }
}
export default handler;