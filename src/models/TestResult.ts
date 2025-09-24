import mongoose, { Schema, Document } from 'mongoose';

export interface ITestResult extends Document {
  userId: mongoose.Types.ObjectId;
  language: 'english' | 'bangla';
  wpm: number;
  accuracy: number;
  textId: mongoose.Types.ObjectId;
  duration: number;
  errors: number;
  createdAt: Date;
}

const TestResultSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    language: { type: String, enum: ['english', 'bangla'], required: true },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    textId: { type: Schema.Types.ObjectId, ref: 'TypingText', required: true },
    duration: { type: Number, required: true }, // in seconds
    errors: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.TestResult || mongoose.model<ITestResult>('TestResult', TestResultSchema);