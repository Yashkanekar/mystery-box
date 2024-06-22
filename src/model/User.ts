import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
  content: string;
  createdAt: Date;  
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date; 
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
  }
  
  // Updated User schema
  const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    verifyCode: {
      type: String,
      required: [true, 'Verify Code is required'],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, 'Verify Code Expiry is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },
    messages: [MessageSchema], //indicate that messages will store an array of messageSchema type
    
  });

// as nextjs uses serverless or edge computing environment the code is evaluated per request so nextjs may try to register a model which already exists in the server so we have to ensure this case where model already exists in the server or not.
// 
  const UserModel =
  (mongoose.models.User as mongoose.Model<User>) || // Use existing 'User' model if it exists
  mongoose.model<User>('User', UserSchema);  // Otherwise, create a new 'User' model

  export default UserModel