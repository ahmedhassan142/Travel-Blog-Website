// pages/api/search.js
import  { connectToDatabase } from "@/lib/db";
import blog from '@/schemas/blog'

import category from "@/schemas/category";
import destination from '@/schemas/destination'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await  connectToDatabase ();

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // Search in blogs
    const blogs = await blog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).limit(5);

    // Search in categories
    const categories = await category.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).limit(5);

    // Search in destinations
    const destinations = await destination.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).limit(5);

    res.status(200).json({
      blogs,
      categories,
      destinations,
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}