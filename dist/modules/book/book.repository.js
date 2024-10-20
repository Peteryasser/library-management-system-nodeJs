"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../data-source");
const Book_1 = require("../../entities/Book");
class BookRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Book_1.Book);
    }
    async createBook(bookData) {
        const book = this.repository.create(bookData);
        return await this.repository.save(book);
    }
    async findAllBooks() {
        return await this.repository.findBy({ stock: (0, typeorm_1.MoreThan)(0) });
    }
    async findBookById(id) {
        return await this.repository.findOne({ where: { id } });
    }
    async updateBook(id, bookData) {
        const book = await this.findBookById(id);
        if (!book)
            return null;
        Object.assign(book, bookData);
        return await this.repository.save(book);
    }
    async deleteBook(id) {
        const book = await this.findBookById(id);
        if (book) {
            await this.repository.remove(book);
        }
    }
}
exports.BookRepository = BookRepository;
