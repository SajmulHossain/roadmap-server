import { Types } from "mongoose";

export interface IReply {
  text: string,
  author: string
}

export interface IComment {
  text: string;
  author: string;
  roadmap: Types.ObjectId;
  parentComment: Types.ObjectId;
  replies: IReply;
}


