import { NextResponse } from 'next/server'
import { connection } from '@/dbconnect/lib'
import destination from '@/schemas/destination'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  console.log('--- API CALL STARTED ---') // Debug log
  
  try {
    // 1. Verify connection
    console.log('Connecting to DB...')
    await connection()
    console.log('DB connected')

    // 2. Verify parameter
    console.log('Fetching slug:', params.slug)
    if (!params.slug) {
      return NextResponse.json(
        { error: 'Slug parameter required' },
        { status: 400 }
      )
    }

    // 3. Simple test response (comment out DB code first)
    // return NextResponse.json({ test: 'success' })

    // 4. Actual database query
    const result = await destination.findOne({ 
      slug: params.slug 
    }).lean().exec()

    console.log('Query result:', result)
    
    if (!result) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('API ERROR:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    console.log('--- API CALL COMPLETED ---')
  }
}