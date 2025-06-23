import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin'
}

export interface UserStaticMethod extends Model<IUser> {
  isExist(email: string, password: string): IUser
}