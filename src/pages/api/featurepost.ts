import { NextApiRequest, NextApiResponse } from "next";
import  { connectToDatabase } from "@/lib/db";
import blog from "@/schemas/blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const topPost=await blog.find({})
      .sort({views:-1})
      .limit(10);
      for(const post of topPost){
        if(!post.isFeatured){
           post.isFeatured=true
           await post.save()
        }
      }
      const featuredBlogs = await blog.find({ isFeatured: true }).maxTimeMS(30000) // Fetch featured blogs
        .sort({ createdAt: -1 }) // Sort by creation date (newest first)
        .select("title slug author image createdAt views")
        .lean();

      console.log("Featured Blogs:", featuredBlogs); // Log the results

      const serializedBlogs = featuredBlogs.map((blogs) => ({
        ...blogs,
        _id: String(blogs._id), // Convert _id to string
        createdAt: new Date(blogs.createdAt).toISOString(), // Convert Date to ISO string
      }));

      return res.status(200).json({ data: serializedBlogs });
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
      return res.status(500).json({ message: "Failed to fetch featured blogs", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}


