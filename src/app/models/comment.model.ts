import { model, Schema } from "mongoose";
import { IComment } from "../interfaces/comment.interface";

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
      required: true,
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