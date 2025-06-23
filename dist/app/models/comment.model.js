"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const commentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, "Comment should be given"],
        maxlength: [300, "Commment must be in 300 characters or less"],
    },
    author: {
        type: String,
        ref: "Users",
        required: true,
        validate: [validator_1.default.isEmail, "Invalid email"],
    },
    roadmap: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Roadmaps",
        required: true,
    },
    parentComment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comments",
        default: null,
    },
    depth: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
    },
}, { versionKey: false, timestamps: true });
exports.Comments = (0, mongoose_1.model)("Comments", commentSchema);
