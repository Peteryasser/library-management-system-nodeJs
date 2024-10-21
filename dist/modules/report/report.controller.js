"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const report_service_1 = require("./report.service");
class ReportController {
    constructor() {
        this.reportService = new report_service_1.ReportService();
    }
    async getBorrowedBooks(req, res, next) {
        try {
            const books = await this.reportService.getBorrowedBooks();
            res.status(200).json(books);
        }
        catch (error) {
            next(error);
        }
    }
    async getPopularBooks(req, res, next) {
        try {
            const books = await this.reportService.getPopularBooks();
            res.status(200).json(books);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReportController = ReportController;
