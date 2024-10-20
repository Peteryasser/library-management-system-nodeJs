"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_repository_1 = require("./book.repository");
const customError_1 = require("../../utils/customError");
class BookService {
    constructor() {
        this.bookRepository = new book_repository_1.BookRepository();
    }
    async createBook(bookData) {
        try {
            return await this.bookRepository.createBook(bookData);
        }
        catch (error) {
            throw new customError_1.CustomError('Error creating book. Please check your input.', 500);
        }
    }
    async findAllAvailableBooks() {
        try {
            return await this.bookRepository.findAllBooks();
        }
        catch (error) {
            throw new customError_1.CustomError('Error retrieving books.', 500);
        }
    }
    async findBookById(id) {
        const book = await this.bookRepository.findBookById(id);
        if (!book) {
            throw new customError_1.CustomError('Book not found.', 404);
        }
        return book;
    }
    async updateBook(id, bookData) {
        const book = await this.bookRepository.updateBook(id, bookData);
        if (!book) {
            throw new customError_1.CustomError('Book not found or update failed.', 404);
        }
        return book;
    }
    async deleteBook(id) {
        const book = await this.bookRepository.findBookById(id);
        if (!book) {
            throw new customError_1.CustomError('Book not found.', 404);
        }
        await this.bookRepository.deleteBook(id);
    }
}
exports.BookService = BookService;
