import { Types } from "mongoose";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  roadmap: Types.ObjectId;
  parentComment: Types.ObjectId;
  depth: number;
}
