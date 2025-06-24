import validator from "validator";
import { model, Schema } from "mongoose";
import {
  IRoadmap,
  IVoter,
  RoadmapStaticMethod,
} from "../interfaces/roadmap.interface";

const voterSchema = new Schema<IVoter>(
  {
    user: {
      type: String,
      required: true,
      ref: "Users",
      validate: [validator.isEmail, "Email is not valid"],
    },
  },
  { versionKey: false, timestamps: true, _id: false }
);

const roadmapSchema = new Schema<IRoadmap, RoadmapStaticMethod>(
  {
    title: {
      type: String,
      required: [true, "Title must be given"],
      trim: true,
      maxlength: [80, "Title should not exceed 80 characters"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description exceeded 1000 characters"],
      default: "",
    },
    category: {
      type: String,
      enum: ["feature", "improvement", "bug", "idea", "other"],
      lowercase: true,
      default: "other",
    },
    status: {
      type: String,
      enum: ["planned", "in_progress", "completed"],
      lowercase: true,
      required: true,
      default: "planned",
    },
    upvotes: [voterSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

roadmapSchema.static("isVoted", async function (email: string, id: string) {
  const roadmap = await Roadmaps.findOne({ _id: id, "upvotes.user": email });

  return !!roadmap;
});

export const Roadmaps = model<IRoadmap, RoadmapStaticMethod>(
  "Roadmaps",
  roadmapSchema
);
