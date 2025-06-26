// src/schemas/category.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from '@/types/category';

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] }
}, { timestamps: true });

// Check if model already exists before creating it
const Category = mongoose.models.Category as mongoose.Model<ICategory> || 
  mongoose.model<ICategory>('Category', categorySchema);

export default Category;