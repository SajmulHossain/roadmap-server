import { Types } from "mongoose";

export interface IComment {
  text: string;
  author: string;
  roadmap: Types.ObjectId;
  parentComment: Types.ObjectId;
  depth: number;
}
