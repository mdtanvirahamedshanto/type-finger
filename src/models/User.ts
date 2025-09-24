import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  typingStats: {
    averageWPM: number;
    highestWPM: number;
    totalTests: number;
    languages: {
      english: {
        averageWPM: number;
        highestWPM: number;
        totalTests: number;
      };
      bangla: {
        averageWPM: number;
        highestWPM: number;
        totalTests: number;
      };
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    emailVerified: { type: Date },
    typingStats: {
      averageWPM: { type: Number, default: 0 },
      highestWPM: { type: Number, default: 0 },
      totalTests: { type: Number, default: 0 },
      languages: {
        english: {
          averageWPM: { type: Number, default: 0 },
          highestWPM: { type: Number, default: 0 },
          totalTests: { type: Number, default: 0 },
        },
        bangla: {
          averageWPM: { type: Number, default: 0 },
          highestWPM: { type: Number, default: 0 },
          totalTests: { type: Number, default: 0 },
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);