// src/types/category.d.ts
import { Document } from 'mongoose';

export interface ICategory extends Document {
    _id: Types.ObjectId; 
  name: string;
  slug: string;
  description: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}