import { BookRepository } from './book.repository';
import { CreateBookDTO, UpdateBookDTO } from './book.dto';
import { CustomError } from '../../utils/customError';

export class BookService {
  private bookRepository = new BookRepository();

  async createBook(bookData: CreateBookDTO) {
    try {
      return await this.bookRepository.createBook(bookData);
    } catch (error) {
      throw new CustomError('Error creating book. Please check your input.', 500);
    }
  }

  async findAllAvailableBooks() {
    try {
      return await this.bookRepository.findAllBooks();
    } catch (error) {
      throw new CustomError('Error retrieving books.', 500);
    }
  }

  async findBookById(id: number) {
    const book = await this.bookRepository.findBookById(id);
    if (!book) {
      throw new CustomError('Book not found.', 404);
    }
    return book;
  }

  async updateBook(id: number, bookData: UpdateBookDTO) {
    const book = await this.bookRepository.updateBook(id, bookData);
    if (!book) {
      throw new CustomError('Book not found or update failed.', 404);
    }
    return book;
  }

  async deleteBook(id: number) {
    const book = await this.bookRepository.findBookById(id);
    if (!book) {
      throw new CustomError('Book not found.', 404);
    }

    await this.bookRepository.deleteBook(id);
  }
}
