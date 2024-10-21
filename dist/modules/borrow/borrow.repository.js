"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRepository = void 0;
const data_source_1 = require("../../data-source");
const Borrow_1 = require("../../entities/Borrow");
const Book_1 = require("../../entities/Book");
const User_1 = require("../../entities/User");
const typeorm_1 = require("typeorm");
class BorrowRepository {
    constructor() {
        this.borrowRepo = data_source_1.AppDataSource.getRepository(Borrow_1.Borrow);
        this.bookRepo = data_source_1.AppDataSource.getRepository(Book_1.Book);
        this.userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    async createBorrow(userId, bookId) {
        // Fetch the book and user
        const book = await this.bookRepo.findOne({ where: { id: bookId } });
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!book || !user)
            return null; // If book or user is not found
        // Check if the user already borrowed this book and hasn't returned it yet
        const existingBorrow = await this.borrowRepo.findOne({
            where: { user: { id: userId }, book: { id: bookId }, returnDate: (0, typeorm_1.IsNull)() }
        });
        if (existingBorrow) {
            throw new Error('You already have this book borrowed');
        }
        // Ensure stock is available before creating the borrow record
        if (book.stock <= 0) {
            throw new Error('Book is out of stock');
        }
        // Create a new borrow record
        const borrow = this.borrowRepo.create({
            user,
            book,
            borrowDate: new Date()
        });
        // Update the book's stock and total borrowed count
        book.stock -= 1; // Decrease stock
        book.totalBorrowed += 1; // Increase total borrowed count
        // Save both the borrow record and the updated book entity
        await this.bookRepo.save(book);
        return await this.borrowRepo.save(borrow);
    }
    async findBorrowById(borrowId) {
        return await this.borrowRepo.findOne({ where: { id: borrowId }, relations: ['book', 'user'] });
    }
    async returnBorrow(borrowId) {
        const borrow = await this.findBorrowById(borrowId);
        if (!borrow)
            return null;
        // Check if the book has already been returned
        if (borrow.returnDate !== null) {
            throw new Error('This book has already been returned');
        }
        // Update the borrow record's return date
        borrow.returnDate = new Date();
        // Increase the book's stock since it's being returned
        const book = await this.bookRepo.findOne({ where: { id: borrow.book.id } });
        if (book) {
            book.stock += 1;
            await this.bookRepo.save(book);
        }
        return await this.borrowRepo.save(borrow);
    }
    async findUserBorrowHistory(userId) {
        return await this.borrowRepo.find({ where: { user: { id: userId } }, relations: ['book'] });
    }
}
exports.BorrowRepository = BorrowRepository;
