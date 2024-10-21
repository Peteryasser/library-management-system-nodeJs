import { ReportRepository } from './report.repository';

export class ReportService {
  private reportRepository = new ReportRepository();

  async getBorrowedBooks() {
    const borrowedBooks = await this.reportRepository.getBorrowedBooks();

    // Format the response to return only the desired fields
    return borrowedBooks.map(borrow => ({
      borrowId: borrow.id,
      borrowDate: borrow.borrowDate,
      bookId: borrow.book.id,
      userId: borrow.user.id,
    }));
  }

  async getPopularBooks() {
    return await this.reportRepository.getPopularBooks();
  }
}
