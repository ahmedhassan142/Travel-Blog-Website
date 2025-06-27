// models/Subscription.ts
import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
