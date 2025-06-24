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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const jwt_config_1 = require("../config/jwt.config");
const verifyToken_1 = require("../middleware/verifyToken");
exports.authRouter = express_1.default.Router();
exports.authRouter.get("", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = req.user;
    const user = yield user_model_1.Users.findOne({ email: user1 === null || user1 === void 0 ? void 0 : user1.email });
    res.json({
        success: true,
        message: "Valid user",
        data: user,
    });
}));
exports.authRouter.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const user = yield user_model_1.Users.create(body);
    const token = (0, jwt_config_1.addCookies)(body.email);
    res
        .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
        .status(201)
        .json({
        success: true,
        message: "Sign up successful",
        data: user,
    });
}));
exports.authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const user = yield user_model_1.Users.isExist(body.email, body.password);
    const token = (0, jwt_config_1.addCookies)(body.email);
    res
        .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
        .status(200)
        .json({
        success: true,
        message: "Login successful",
        data: user,
    });
}));
exports.authRouter.get("/logout", (req, res) => {
    res
        .clearCookie("token", {
        maxAge: 0,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
        .send({
        success: true,
        message: "Logout successful",
    });
});
