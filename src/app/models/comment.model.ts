import { model, Schema } from "mongoose";
import { IComment, IReply } from "../interfaces/comment.interface";
import validator from "validator";

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
      type: String,
      ref: "Users",
      required: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    roadmap: {
      type: Schema.Types.ObjectId,
      ref: "Roadmaps",
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      default: null,
    },
    replies: [replySchema],
  },
  { versionKey: false, timestamps: true }
);

export const Comments = model("Comments", commentSchema);
