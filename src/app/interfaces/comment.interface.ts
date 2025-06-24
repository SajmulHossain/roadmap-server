import { Types } from "mongoose";

export interface IReply {
  text: string,
  author: string
}

export interface IComment {
  text: string;
  author: Types.ObjectId;
  roadmap: Types.ObjectId;
  replies: IReply;
}


