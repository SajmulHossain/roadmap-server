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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const user_model_1 = require("../models/user.model");
// interface AuthReq extends Request {
//   user?: {
//     email: string;
//     isAdmin: boolean;
//   };
// }
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }
    jsonwebtoken_1.default.verify(token, env_config_1.secret_token, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(400).send({ message: "Unauthorized access" });
            return;
        }
        const user = yield user_model_1.Users.findOne({ email: decoded.email });
        if (!user) {
            res.status(400).send({ message: "Unauthorized access" });
            return;
        }
        req.user = {
            email: user.email,
            isAdmin: user.role === "admin",
        };
        next();
    }));
};
exports.verifyToken = verifyToken;
