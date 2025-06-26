import mongoose, { Schema, Document } from 'mongoose';

interface IContactSubmission extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  status: string;
}

const ContactSubmissionSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'unread' }
});

const ContactSubmission = mongoose.models.contacts || 
  mongoose.model<IContactSubmission>('contacts', ContactSubmissionSchema);

export default ContactSubmission;