import mongoose, { Schema, Document } from 'mongoose';

export interface ITypingText extends Document {
  text: string;
  language: 'english' | 'bangla';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const TypingTextSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    language: { type: String, enum: ['english', 'bangla'], required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.TypingText || mongoose.model<ITypingText>('TypingText', TypingTextSchema);