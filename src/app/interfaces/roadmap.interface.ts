import { Types } from "mongoose";

export interface IRoadmap {
  title: string;
  description: string;
  category: "feature" | "improvement" | "bug" | "idea" | "other";
  status: "planned" | "in_progress" | "completed";
  upvotes: [{ user: Types.ObjectId }];
}
