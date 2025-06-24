"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
const routeNotFound = (req, res) => {
    res.status(404).json({ message: "Route not found", success: false, route: req.url });
};
exports.routeNotFound = routeNotFound;
