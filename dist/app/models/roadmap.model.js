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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roadmaps = void 0;
const validator_1 = __importDefault(require("validator"));
const mongoose_1 = require("mongoose");
const voterSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
        ref: "Users",
        validate: [validator_1.default.isEmail, "Email is not valid"],
    },
}, { versionKey: false, timestamps: true, _id: false });
const roadmapSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title must be given"],
        trim: true,
        maxlength: [80, "Title should not exceed 80 characters"],
    },
    description: {
        type: String,
        maxlength: [1000, "Description exceeded 1000 characters"],
        default: "",
    },
    category: {
        type: String,
        enum: ["feature", "improvement", "bug", "idea", "other"],
        lowercase: true,
        default: "other",
    },
    status: {
        type: String,
        enum: ["planned", "in_progress", "completed"],
        lowercase: true,
        required: true,
        default: "planned",
    },
    upvotes: [voterSchema],
}, {
    versionKey: false,
    timestamps: true,
});
roadmapSchema.static("isVoted", function (email, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const roadmap = yield exports.Roadmaps.findOne({ _id: id, "upvotes.user": email });
        return !!roadmap;
    });
});
exports.Roadmaps = (0, mongoose_1.model)("Roadmaps", roadmapSchema);
