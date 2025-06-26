import mongoose from 'mongoose';


const BlogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  image: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  views: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
