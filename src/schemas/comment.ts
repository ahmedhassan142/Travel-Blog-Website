import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Comment interface
export interface IComment extends Document {
  blog: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  content: string;
  createdAt?: Date;
}

// Define the Comment schema
const CommentSchema: Schema = new Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Define the Comment model type
interface ICommentModel extends Model<IComment> {}

// Create and export the Comment model
const Comment: ICommentModel =
  mongoose.models.Comment || mongoose.model<IComment, ICommentModel>('Comment', CommentSchema);

export default Comment;