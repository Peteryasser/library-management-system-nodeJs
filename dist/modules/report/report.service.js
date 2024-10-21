"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const report_repository_1 = require("./report.repository");
class ReportService {
    constructor() {
        this.reportRepository = new report_repository_1.ReportRepository();
    }
    async getBorrowedBooks() {
        const borrowedBooks = await this.reportRepository.getBorrowedBooks();
        // Format the response to return only the desired fields
        return borrowedBooks.map(borrow => ({
            borrowId: borrow.id,
            borrowDate: borrow.borrowDate,
            bookId: borrow.book.id,
            userId: borrow.user.id,
        }));
    }
    async getPopularBooks() {
        return await this.reportRepository.getPopularBooks();
    }
}
exports.ReportService = ReportService;
