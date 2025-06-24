"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCookies = void 0;
const env_config_1 = require("./env.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addCookies = (email) => {
    const token = jsonwebtoken_1.default.sign({ email }, env_config_1.secret_token, {
        expiresIn: "12h",
    });
    return token;
};
exports.addCookies = addCookies;
