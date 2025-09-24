import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  password?: string;
  salt?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
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
  
  // Methods for password management
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
  getResetPasswordToken(): string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    emailVerified: { type: Date },
    password: { type: String },
    salt: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
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

// Methods for password management
UserSchema.methods.setPassword = function(password: string): void {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

UserSchema.methods.validatePassword = function(password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.password === hash;
};

UserSchema.methods.getResetPasswordToken = function(): string {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);