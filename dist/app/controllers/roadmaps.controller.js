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
exports.roadmapRouter = void 0;
const express_1 = __importDefault(require("express"));
const roadmap_model_1 = require("../models/roadmap.model");
const verifyToken_1 = require("../middleware/verifyToken");
exports.roadmapRouter = express_1.default.Router();
exports.roadmapRouter.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield roadmap_model_1.Roadmaps.find();
    res.json({
        success: true,
        message: "Data retrived successfully",
        data,
    });
}));
exports.roadmapRouter.post("", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        res.status(403).json({
            success: false,
            name: "ValidationError",
            message: "Admin access only",
        });
        return;
    }
    const { body } = req;
    const data = yield roadmap_model_1.Roadmaps.create(body);
    res.status(201).json({
        success: true,
        message: "Data created successfully",
        data,
    });
}));
