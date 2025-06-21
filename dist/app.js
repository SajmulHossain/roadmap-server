"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Roadmap server is running!");
});
app.use((req, res) => {
    res.json({ message: "Route not found", success: false });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            message: error.message === 'ValidationError' ? 'Validation failed' : error.message === 'CastError' ? "Cannot get by this id" : 'Unknown Error Occured',
            success: false,
            error
        });
    }
});
exports.default = app;
