"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const data_source_1 = require("../data-source");
const Book_1 = require("../entities/Book");
const getBooks = async (req, res) => {
    try {
        const books = await data_source_1.AppDataSource.getRepository(Book_1.Book).find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await data_source_1.AppDataSource.getRepository(Book_1.Book).findOne({ where: { id: parseInt(id) } });
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        }
        else {
            res.status(200).json(book);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching the book', error });
    }
};
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    const { title, author, publishedDate, stock } = req.body;
    try {
        const book = new Book_1.Book();
        book.title = title;
        book.author = author;
        book.publishedDate = new Date(publishedDate);
        book.stock = stock;
        await data_source_1.AppDataSource.getRepository(Book_1.Book).save(book);
        res.status(201).json({ message: 'Book created successfully', book });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, publishedDate, stock } = req.body;
    try {
        const book = await data_source_1.AppDataSource.getRepository(Book_1.Book).findOne({ where: { id: parseInt(id) } });
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        }
        else {
            book.title = title || book.title;
            book.author = author || book.author;
            book.publishedDate = publishedDate ? new Date(publishedDate) : book.publishedDate;
            book.stock = stock !== undefined ? stock : book.stock;
            await data_source_1.AppDataSource.getRepository(Book_1.Book).save(book);
            res.status(200).json({ message: 'Book updated successfully', book });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await data_source_1.AppDataSource.getRepository(Book_1.Book).findOne({ where: { id: parseInt(id) } });
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        }
        else {
            await data_source_1.AppDataSource.getRepository(Book_1.Book).remove(book);
            res.status(200).json({ message: 'Book deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};
exports.deleteBook = deleteBook;
