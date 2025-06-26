// pages/api/increment-views.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "@/dbconnect/lib";
import blog from "@/schemas/blog";

const VIEWS_LIMIT_FOR_FEATURED = 1; // Set your views limit here

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();

  if (req.method === "PUT") {
    const  slug  = req.body; // Get the postId from the request body

    try {
      // Increment the views field by 1
      const updatedPost = await blog.findByIdAndUpdate(
        slug,
        { $inc: { views: 1 } }, // Increment views by 1
        { new: true } // Return the updated document
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if views have crossed the limit
      if (updatedPost.views >= VIEWS_LIMIT_FOR_FEATURED && !updatedPost.isFeatured) {
        updatedPost.isFeatured = true; // Mark as featured
        await updatedPost.save();
      }

      return res.status(200).json({ data: updatedPost });
    } catch (error) {
      console.error("Error incrementing views:", error);
      return res.status(500).json({ message: "Failed to increment views", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}