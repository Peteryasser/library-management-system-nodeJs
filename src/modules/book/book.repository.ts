import { MoreThan } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Book } from '../../entities/Book';
import { CreateBookDTO, UpdateBookDTO } from './book.dto';

export class BookRepository {
  private repository = AppDataSource.getRepository(Book);

  async createBook(bookData: CreateBookDTO): Promise<Book> {
    const book = this.repository.create(bookData);
    return await this.repository.save(book);
  }

  async findAllBooks(): Promise<Book[]> {
    return await this.repository.findBy({stock: MoreThan(0)});
  }

  async findBookById(id: number): Promise<Book | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async updateBook(id: number, bookData: UpdateBookDTO): Promise<Book | null> {
    const book = await this.findBookById(id);
    if (!book) return null;

    Object.assign(book, bookData);
    return await this.repository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.findBookById(id);
    if (book) {
      await this.repository.remove(book);
    }
  }
}
