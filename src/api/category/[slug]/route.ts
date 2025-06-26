import category from "@/schemas/category";
// import { getSession } from "next-auth/react"
import { connection } from "@/dbconnect/lib";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connection();

  const { slug } = req.query;

  try {
    const Category = await category.findOne({ slug }).lean();

    if (!Category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}