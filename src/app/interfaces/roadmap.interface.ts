import { Model, Types } from "mongoose";

export interface IVoter {
  user: string
}

export interface IRoadmap {
  title: string;
  description: string;
  category: "feature" | "improvement" | "bug" | "idea" | "other";
  status: "planned" | "in_progress" | "completed";
  upvotes: [IVoter];
}

export interface RoadmapStaticMethod extends Model<IRoadmap> {
  isVoted(email: string, id: string): boolean
}