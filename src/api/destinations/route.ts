import { connection } from "@/dbconnect/lib";
import { NextApiRequest, NextApiResponse } from "next";
import destination from "@/schemas/destination";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    await connection()
    if(req.method==="GET"){
      try {
        const founddestination=await destination.find({}).maxTimeMS(30000);
        if(!founddestination){
            return res.status(304).json({message:"Destination Not Found"})
        }
        return res.status(201).json({data:founddestination})
        console.log("found destination successfully")
        
      } catch (error) {
        return res.status(400).json({message:"Failed to fetch destinations"})
      }
    }else if(req.method==="POST"){
        try {
            const Newdestination=await destination.create(req.body)
            if(!Newdestination){
                return res.status(402).json({message:"Destination not posted"})
            }
            return res.status(200).json({data:Newdestination})
            
        } catch (error) {
            return res.status(403).json({message:"Destination Not Posted Due to Server issue"})
        }
    }else{
        return res.status(505).json({message:"Method Not Allowed"})
    }
}