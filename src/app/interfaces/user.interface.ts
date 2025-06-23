import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface UserStaticMethod extends Model<IUser> {
  isExist(email: string, password: string): IUser
}