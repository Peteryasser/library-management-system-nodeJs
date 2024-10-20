"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const book_dto_1 = require("./book.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const customError_1 = require("../../utils/customError");
class BookController {
    constructor() {
        this.bookService = new book_service_1.BookService();
    }
    async getAvailableBooks(req, res, next) {
        try {
            const books = await this.bookService.findAllAvailableBooks();
            res.status(200).json(books);
        }
        catch (error) {
            next(error);
        }
    }
    async createBook(req, res, next) {
        const bookData = (0, class_transformer_1.plainToInstance)(book_dto_1.CreateBookDTO, req.body);
        const errors = await (0, class_validator_1.validate)(bookData);
        if (errors.length > 0) {
            const validationMessages = errors.map(err => Object.values(err.constraints)).join(', ');
            return next(new customError_1.CustomError(`Validation failed: ${validationMessages}`, 400));
        }
        try {
            const book = await this.bookService.createBook(bookData);
            res.status(201).json({ message: 'Book created successfully', book });
        }
        catch (error) {
            next(error);
        }
    }
    async updateBook(req, res, next) {
        const { id } = req.params;
        const bookData = (0, class_transformer_1.plainToInstance)(book_dto_1.UpdateBookDTO, req.body);
        const errors = await (0, class_validator_1.validate)(bookData);
        if (errors.length > 0) {
            const validationMessages = errors.map(err => Object.values(err.constraints)).join(', ');
            return next(new customError_1.CustomError(`Validation failed: ${validationMessages}`, 400));
        }
        try {
            const book = await this.bookService.updateBook(+id, bookData);
            res.status(200).json({ message: 'Book updated successfully', book });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteBook(req, res, next) {
        const { id } = req.params;
        try {
            await this.bookService.deleteBook(+id);
            res.status(200).json({ message: 'Book deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BookController = BookController;
