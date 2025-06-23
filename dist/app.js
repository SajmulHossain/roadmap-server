"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./app/auth/auth.route");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./app/middleware/errorHandler");
const _404_route_1 = require("./app/middleware/404.route");
const roadmaps_controller_1 = require("./app/controllers/roadmaps.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_route_1.authRouter);
app.use("/api/roadmaps", roadmaps_controller_1.roadmapRouter);
app.get("/", (req, res) => {
    res.send("Roadmap server is running!");
});
app.use(_404_route_1.routeNotFound);
app.use(errorHandler_1.handleError);
exports.default = app;
