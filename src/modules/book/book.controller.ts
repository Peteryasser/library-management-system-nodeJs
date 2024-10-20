import { Request, Response, NextFunction } from 'express';
import { BookService } from './book.service';
import { CreateBookDTO, UpdateBookDTO } from './book.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '../../utils/customError';

export class BookController {
  private bookService = new BookService();

  async getAvailableBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await this.bookService.findAllAvailableBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bookData = plainToInstance(CreateBookDTO, req.body);
    const errors = await validate(bookData);

    if (errors.length > 0) {
      const validationMessages = errors.map(err => Object.values(err.constraints!)).join(', ');
      return next(new CustomError(`Validation failed: ${validationMessages}`, 400));
    }

    try {
      const book = await this.bookService.createBook(bookData);
      res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const bookData = plainToInstance(UpdateBookDTO, req.body);
    const errors = await validate(bookData);

    if (errors.length > 0) {
      const validationMessages = errors.map(err => Object.values(err.constraints!)).join(', ');
      return next(new CustomError(`Validation failed: ${validationMessages}`, 400));
    }

    try {
      const book = await this.bookService.updateBook(+id, bookData);
      res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      await this.bookService.deleteBook(+id);
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}