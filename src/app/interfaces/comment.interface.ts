import { Types } from "mongoose";

export interface IComment {
  text: string;
  author: Types.ObjectId;
  roadmap: Types.ObjectId;
  parentComment: Types.ObjectId;
  depth: number;
}
