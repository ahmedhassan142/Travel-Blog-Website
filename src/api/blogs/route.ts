import blog from "@/schemas/blog"; // Ensure correct schema import
import { connection } from "@/dbconnect/lib";
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// API Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connection(); // Connect to DB

  if (req.method === "GET") {
    try {
      const blogs = await blog.find({}).maxTimeMS(30000);
      if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
      }
      return res.status(200).json({ data: blogs });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res.status(500).json({ message: "Failed to fetch blogs", error });
    }
  }

  if (req.method === "POST") {
    try {
      const form = new IncomingForm({ multiples: false });

      form.parse(req, async (err: Error, fields: Fields, files: Files) => {
        if (err) {
          return res.status(500).json({ message: "Error parsing form", error: err });
        }

        // Extract the first element from each field array
        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
        const slug = Array.isArray(fields.slug) ? fields.slug[0] : fields.slug;
        const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;

        let imageUrl = "";

        if (files.image) {
          const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
          const imagePath = imageFile.filepath;

          const imageBuffer = fs.readFileSync(imagePath);

          // Upload image to Cloudinary
          const result = await cloudinary.v2.uploader.upload(`data:image/jpeg;base64,${imageBuffer.toString("base64")}`, {
            folder: "blog-images",
          });

          imageUrl = result.secure_url;
        }

        // Save to MongoDB
        const newBlog = await blog.create({
          title,
          content,
          author,
          slug,
          image: imageUrl,
        });

        return res.status(201).json({ data: newBlog });
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ message: "Failed to create blog", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};

export default handler;