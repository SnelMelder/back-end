import { Schema, model } from 'mongoose';
import UserInterface from '../interfaces/user.interface';

const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = model<UserInterface>('User', userSchema);
export default userModel;
