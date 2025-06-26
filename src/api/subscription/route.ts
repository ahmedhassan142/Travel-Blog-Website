
import { connection } from "@/dbconnect/lib";
import {z} from "zod"
import { NextApiRequest, NextApiResponse } from "next";
import subscriptiom from "@/schemas/subscriptiom";




const subscriptionSchema = z.object({
    email: z.string().email('Invalid email address'),
  });
  export default async function handler(req:NextApiRequest,res:NextApiResponse){
 await connection()
       if(req.method==="POST"){
              try {
                const validation=subscriptionSchema.safeParse(req.body)
                if(!validation.success){
                    return res.status(403).json({message:"validation failed"})
                }
                const Subscription=await subscriptiom.create(req.body)
                 res.status(200).json({data:Subscription})
              } catch (error) {
                return res.status(404).json({message:"Failed to subscription"})
              }
       }else{
        return res.status(500).json({message:"Method Not Allowed"})
       }
  }