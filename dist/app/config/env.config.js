"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret_token = exports.mongoURI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.Mongo_uri;
exports.mongoURI = mongoURI;
const secret_token = process.env.SECRET_TOKEN;
exports.secret_token = secret_token;
