"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../utils/customError");
function errorHandler(err, req, res, next) {
    const statusCode = (err instanceof customError_1.CustomError) ? err.statusCode : 500;
    let message = err.message || 'Internal Server Error';
    if (err.message.includes('Duplicate entry')) {
        message = 'This email is already registered. Please use a different email.';
    }
    else if (err.message.includes('Data truncated')) {
        message = 'Invalid data provided. Please check your input (e.g., role or other fields).';
    }
    // Send clean response to the client
    res.status(statusCode).json({ message });
}
exports.errorHandler = errorHandler;
