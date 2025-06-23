"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
const routeNotFound = (req, res) => {
    res.json({ message: "Route not found", success: false });
};
exports.routeNotFound = routeNotFound;
