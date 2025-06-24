"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, req, res, next) => {
    if (error) {
        res.status(error.code || error.statusCode || error.status || 400).json({
            name: (error === null || error === void 0 ? void 0 : error.name) || "Internal server error",
            message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!",
            success: false,
            error,
        });
    }
    next();
};
exports.handleError = handleError;
