import category from "@/schemas/category";
// import { getSession } from "next-auth/react"
import { connection } from "@/dbconnect/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
    await connection()

    if (req.method === "GET") {
        try {
            
            const categories = await category.find({}).maxTimeMS(30000);
            if (!categories.length) {
                return res.status(404).json({ message: "No categories found" });
            }
            return res.status(200).json({ data: categories });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    } 
    
    else if (req.method === "POST") {
//    const session=await getSession({req})
//    if(!session){
//     return res.status(406).json({message:"failed to find session"})
//    }
//    if(session.user?.role !=="admin"){
//     return res.status(403).json({message:"Only admins can allow to make categories"})
//    }
        try {
            const newCategory = await category.create(req.body);
            return res.status(201).json({ data: newCategory });
        } catch (error) {
            return res.status(500).json({ message: "Failed to create category", error });
        }
    }
   

    return res.status(405).json({ message: "Method Not Allowed" });
}
