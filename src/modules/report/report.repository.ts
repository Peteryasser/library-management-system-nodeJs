import { AppDataSource } from '../../data-source';
import { Borrow } from '../../entities/Borrow';
import { Book } from '../../entities/Book';

export class ReportRepository {
  private borrowRepo = AppDataSource.getRepository(Borrow);
  private bookRepo = AppDataSource.getRepository(Book);

  // Fetch only the necessary fields: borrowId, borrowDate, bookId, userId
  async getBorrowedBooks() {
    return await this.borrowRepo
      .createQueryBuilder('borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .leftJoinAndSelect('borrow.user', 'user')
      .select([
        'borrow.id',        // borrowId
        'borrow.borrowDate',
        'book.id',          // bookId
        'user.id',          // userId
      ])
      .where('borrow.returnDate IS NULL')  // Only get currently borrowed books
      .getMany();
  }

  // Fetch the most popular books based on totalBorrowed
  async getPopularBooks() {
    return await this.bookRepo.find({
      order: { totalBorrowed: 'DESC' },  // Order by totalBorrowed in descending order
      take: 10  // Limit the result to top 10 popular books
    });
  }
}
