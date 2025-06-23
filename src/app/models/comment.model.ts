import { model, Schema } from "mongoose";
import { IComment } from "../interfaces/comment.interface";
import validator from "validator";

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
    depth: {
      type: Number,
      required: true,
      min: 0,
      max: 2,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Comments = model("Comments", commentSchema);