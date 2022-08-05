import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

interface IUser{
  name: string, 
  email: string, 
  password: string, 
  id: string
}


const UserSchema = new Schema<IUser>({
  name: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  password: {
    type: String, required: true
  },
  id: {type: String}
},{timestamps: true});


const User = model<IUser>('User', UserSchema)


export default User;