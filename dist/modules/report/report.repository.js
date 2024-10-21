"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const data_source_1 = require("../../data-source");
const Borrow_1 = require("../../entities/Borrow");
const Book_1 = require("../../entities/Book");
class ReportRepository {
    constructor() {
        this.borrowRepo = data_source_1.AppDataSource.getRepository(Borrow_1.Borrow);
        this.bookRepo = data_source_1.AppDataSource.getRepository(Book_1.Book);
    }
    // Fetch only the necessary fields: borrowId, borrowDate, bookId, userId
    async getBorrowedBooks() {
        return await this.borrowRepo
            .createQueryBuilder('borrow')
            .leftJoinAndSelect('borrow.book', 'book')
            .leftJoinAndSelect('borrow.user', 'user')
            .select([
            'borrow.id', // borrowId
            'borrow.borrowDate',
            'book.id', // bookId
            'user.id', // userId
        ])
            .where('borrow.returnDate IS NULL') // Only get currently borrowed books
            .getMany();
    }
    // Fetch the most popular books based on totalBorrowed
    async getPopularBooks() {
        return await this.bookRepo.find({
            order: { totalBorrowed: 'DESC' }, // Order by totalBorrowed in descending order
            take: 10 // Limit the result to top 10 popular books
        });
    }
}
exports.ReportRepository = ReportRepository;
