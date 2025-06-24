"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roadmaps = void 0;
const mongoose_1 = require("mongoose");
const voterSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
}, { versionKey: false, timestamps: true });
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
        default: 'planned'
    },
    upvotes: [voterSchema],
}, {
    versionKey: false,
    timestamps: true
});
exports.Roadmaps = (0, mongoose_1.model)("Roadmaps", roadmapSchema);
