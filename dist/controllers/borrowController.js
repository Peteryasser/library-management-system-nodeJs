"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = void 0;
const data_source_1 = require("../data-source");
const Borrow_1 = require("../entities/Borrow");
const Book_1 = require("../entities/Book");
const User_1 = require("../entities/User");
const borrowBook = async (req, res) => {
    const { userId, bookId, borrowDate } = req.body;
    try {
        const book = await data_source_1.AppDataSource.getRepository(Book_1.Book).findOne({ where: { id: bookId } });
        const user = await data_source_1.AppDataSource.getRepository(User_1.User).findOne({ where: { id: userId } });
        if (!book || !user) {
            res.status(404).json({ message: 'Book or user not found' });
            return;
        }
        if (book.stock < 1) {
            res.status(400).json({ message: 'Book is out of stock' });
            return;
        }
        const borrow = new Borrow_1.Borrow();
        borrow.user = user;
        borrow.book = book;
        borrow.borrowDate = new Date(borrowDate);
        await data_source_1.AppDataSource.getRepository(Borrow_1.Borrow).save(borrow);
        book.stock -= 1;
        await data_source_1.AppDataSource.getRepository(Book_1.Book).save(book);
        res.status(201).json({ message: 'Book borrowed successfully', borrow });
    }
    catch (error) {
        res.status(500).json({ message: 'Error borrowing book', error });
    }
};
exports.borrowBook = borrowBook;
const returnBook = async (req, res) => {
    const { borrowId, returnDate } = req.body;
    try {
        const borrow = await data_source_1.AppDataSource.getRepository(Borrow_1.Borrow).findOne({
            where: { id: borrowId },
            relations: ['book'],
        });
        if (!borrow) {
            res.status(404).json({ message: 'Borrow record not found' });
            return;
        }
        borrow.returnDate = new Date(returnDate);
        await data_source_1.AppDataSource.getRepository(Borrow_1.Borrow).save(borrow);
        borrow.book.stock += 1;
        await data_source_1.AppDataSource.getRepository(Book_1.Book).save(borrow.book);
        res.status(200).json({ message: 'Book returned successfully', borrow });
    }
    catch (error) {
        res.status(500).json({ message: 'Error returning book', error });
    }
};
exports.returnBook = returnBook;
