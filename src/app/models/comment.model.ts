import { model, Schema } from "mongoose";
import { IComment, IReply } from "../interfaces/comment.interface";
import validator from "validator";
import { Users } from "./user.model";

const replySchema = new Schema<IReply>(
  {
    text: {
      required: true,
      type: String,
      maxlength: [300, "You comment should within 300 characters."],
    },
    author: {
      type: String,
      ref: "Users",
      required: true,
      validate: [validator.isEmail, "Invalid email"],
    },
  },
  { versionKey: false, _id: false, timestamps: true }
);

const commentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: [true, "Comment should be given"],
      maxlength: [300, "Commment must be in 300 characters or less"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User is required"],
    },
    roadmap: {
      type: Schema.Types.ObjectId,
      ref: "Roadmaps",
      required: true,
    },
    replies: [replySchema],
  },
  { versionKey: false, timestamps: true }
);

commentSchema.pre("save", async function (next) {
  const user = await Users.findById(this.author);
  
  if(!user) {
    throw {
      success: false,
      message: 'User not found',
      data: user
    }

    return;
  }

  next();
} )

export const Comments = model("Comments", commentSchema);
