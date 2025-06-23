import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name must be given"],
      trim: true,
      minlength: [3, "Name must be atleast 3 characters longer"],
      maxlength: [40, "Name must be in 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Email must be given"],
      unique: [true, "Email is already taken"],
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password not given"],
      minlength: [6, "Password must be atleast 6 characters"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
})

export const Users = model("Users", userSchema);