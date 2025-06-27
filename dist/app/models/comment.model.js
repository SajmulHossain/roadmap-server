"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const replySchema = new mongoose_1.Schema({
    text: {
        required: true,
        type: String,
        maxlength: [300, "You comment should within 300 characters."],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
}, { versionKey: false, _id: false, timestamps: true });
const commentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, "Comment should be given"],
        maxlength: [300, "Commment must be in 300 characters or less"],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User is required"],
    },
    roadmap: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Roadmaps",
        required: true,
    },
    replies: [replySchema],
}, { versionKey: false, timestamps: true });
commentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkUser(this.author);
        next();
    });
});
commentSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const updates = this.getUpdate();
        yield checkUser(updates.$addToSet.replies.author);
        const data = yield exports.Comments.findOne(this.getQuery());
        const replies = (data === null || data === void 0 ? void 0 : data.replies) || [];
        if (replies.length >= 3) {
            throw {
                success: false,
                message: "Cannot reply more than three",
                data: null,
            };
            return;
        }
        next();
    });
});
const checkUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.Users.findById(id);
    if (!user) {
        throw {
            success: false,
            message: "User not found",
            data: user,
        };
        return;
    }
});
exports.Comments = (0, mongoose_1.model)("Comments", commentSchema);
