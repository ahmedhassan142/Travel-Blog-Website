import category from "@/schemas/category";
import { connection } from "@/dbconnect/lib";
import type { NextApiRequest, NextApiResponse } from 'next';
import { ICategory } from '@/types/category';

interface ApiResponse {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  createdAt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string; details?: string }>
) {
  console.log('--- CATEGORY API CALL STARTED ---');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connection();
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: 'Slug parameter required' });
    }

    const cleanSlug = Array.isArray(slug) ? slug[0] : slug;
    
    // Add logging to see what we're querying
    console.log(`Looking for category with slug: ${cleanSlug}`);
    
    // Explicitly select the fields we need and populate if needed
    const categoryData = await category.findOne({ slug: cleanSlug })
      .select('_id name slug description images createdAt')
      .lean<ICategory>()
      .exec();

    if (!categoryData) {
      console.log('Category not found in database');
      return res.status(404).json({ error: 'Category not found' });
    }

    // Log the found data for debugging
    console.log('Found category:', {
      name: categoryData.name,
      imageCount: categoryData.images?.length || 0
    });

    // Ensure image URLs are absolute if they're stored as relative paths
    const processedImages = (categoryData.images || []).map((img:any) => {
      if (!img) return '';
      // If the image is stored as a relative path, convert to absolute URL
      if (img.startsWith('/')) {
        return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${img}`;
      }
      return img;
    }).filter((img:any) => img); // Remove any empty strings

    // Create response object with proper typing
    const responseData: ApiResponse = {
      _id: categoryData._id.toString(),
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description,
      images: processedImages, // Use processed images
      createdAt: categoryData.createdAt.toISOString(),
    };

    console.log('Returning category data:', {
      name: responseData.name,
      imageCount: responseData.images.length
    });

    return res.status(200).json(responseData);

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ 
      error: 'Internal server error',
      details: errorMessage
    });
  }
}