import { model, Schema, Types } from "mongoose";
import { IComment, IReply } from "../interfaces/comment.interface";
import { Users } from "./user.model";

const replySchema = new Schema<IReply>(
  {
    text: {
      required: true,
      type: String,
      maxlength: [300, "You comment should within 300 characters."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
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
  await checkUser(this.author);
  next();
});

commentSchema.pre("findOneAndUpdate", async function (next) {
  const updates: any = this.getUpdate();
  await checkUser(updates.$addToSet.replies.author);

  const data = await Comments.findOne(this.getQuery());
  const replies = data?.replies || [];

  if (replies.length >= 3) {
    throw {
      success: false,
      message: "Cannot reply more than three",
      data: null,
    };

    return;
  }
  next();
});

const checkUser = async (id: Types.ObjectId) => {
  const user = await Users.findById(id);

  if (!user) {
    throw {
      success: false,
      message: "User not found",
      data: user,
    };

    return;
  }
};

export const Comments = model("Comments", commentSchema);
