import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  createdAt: Date;
  content: string;
}

const MessageSchema: Schema<Message> = new Schema({
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
  verifycode: string;
  verifycodeexpiry: Date;
  isverified: boolean;
  isacceptingmessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email laxami hay"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "pass laxami hay"],
    trim: true,
  },
  verifycode: {
    type: String,
    required: [true, "verify code laxami hay"],
  },
  verifycodeexpiry: {
    type: Date,
    required: [true, "verify expiry code laxami hay"],
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  isacceptingmessage: {
    type: Boolean,
    default: true,
  },
  message: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
