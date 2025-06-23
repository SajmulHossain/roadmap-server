import { Types } from "mongoose";

export interface IVoter {
  user: Types.ObjectId;
}

export interface IRoadmap {
  title: string;
  description: string;
  category: "feature" | "improvement" | "bug" | "idea" | "other";
  status: "planned" | "in_progress" | "completed";
  upvotes: [IVoter];
}
