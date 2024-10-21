"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const book_routes_1 = __importDefault(require("./modules/book/book.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middlewares/errorHandler");
const borrow_routes_1 = __importDefault(require("./modules/borrow/borrow.routes"));
const report_routes_1 = __importDefault(require("./modules/report/report.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', user_routes_1.default);
app.use('/api/books', book_routes_1.default);
app.use('/api/borrows', borrow_routes_1.default);
app.use('/api/reports', report_routes_1.default);
// Centralized Error Handling Middleware
app.use(errorHandler_1.errorHandler);
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
module.exports = app;
