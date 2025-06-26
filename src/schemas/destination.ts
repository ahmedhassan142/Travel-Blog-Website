import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
});

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
