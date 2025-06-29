import { Types } from "mongoose";

export interface IReply {
  text: string;
  author: Types.ObjectId;
  isEdited: boolean
}

export interface IComment {
  text: string;
  author: Types.ObjectId;
  roadmap: Types.ObjectId;
  replies: [IReply];
  isEdited: boolean
}
