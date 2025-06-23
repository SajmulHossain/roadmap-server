import { model, Schema } from "mongoose";
import { IRoadmap, IVoter } from "../interfaces/roadmap.interface";

const voterSchema = new Schema<IVoter>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const roadmapSchema = new Schema<IRoadmap>({
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
  },
  upvotes: [voterSchema],
});

export const Roadmaps = model("Roadmaps", roadmapSchema);
