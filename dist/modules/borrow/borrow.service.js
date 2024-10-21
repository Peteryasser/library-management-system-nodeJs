"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowService = void 0;
const borrow_repository_1 = require("./borrow.repository");
const customError_1 = require("../../utils/customError");
const email_1 = require("../../utils/email");
class BorrowService {
    constructor() {
        this.borrowRepository = new borrow_repository_1.BorrowRepository();
    }
    async borrowBook(userId, borrowData) {
        try {
            const borrow = await this.borrowRepository.createBorrow(userId, borrowData.bookId);
            if (!borrow) {
                throw new customError_1.CustomError('Book or user not found', 404);
            }
            // Send email after successful borrowing
            await (0, email_1.sendEmail)(borrow.user.email, 'Book Borrowed', `You have borrowed the book: ${borrow.book.title}`);
            return {
                message: 'Book borrowed successfully',
                borrowId: borrow.id,
                bookId: borrow.book.id,
                userId: borrow.user.id,
                borrowDate: borrow.borrowDate,
            };
        }
        catch (error) {
            if (error.message === 'Book is out of stock') {
                throw new customError_1.CustomError('The book is currently out of stock', 400);
            }
            throw error;
        }
    }
    async returnBook(returnData) {
        const borrow = await this.borrowRepository.returnBorrow(returnData.borrowId);
        if (!borrow) {
            throw new customError_1.CustomError('Borrow record not found', 404);
        }
        // Send email after successful return
        await (0, email_1.sendEmail)(borrow.user.email, 'Book Returned', `You have returned the book: ${borrow.book.title}`);
        return {
            message: 'Book returned successfully',
            borrowId: borrow.id,
            bookId: borrow.book.id,
            userId: borrow.user.id,
            borrowDate: borrow.borrowDate,
        };
    }
    async getBorrowHistory(userId) {
        return await this.borrowRepository.findUserBorrowHistory(userId);
    }
}
exports.BorrowService = BorrowService;
