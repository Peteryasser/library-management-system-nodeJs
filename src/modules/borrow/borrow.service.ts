import { BorrowRepository } from './borrow.repository';
import { BorrowBookDTO, ReturnBookDTO } from './borrow.dto';
import { CustomError } from '../../utils/customError';
import { sendEmail } from '../../utils/email';

export class BorrowService {
  private borrowRepository = new BorrowRepository();

  async borrowBook(userId: number, borrowData: BorrowBookDTO) {
    try {
      const borrow = await this.borrowRepository.createBorrow(userId, borrowData.bookId);

      if (!borrow) {
        throw new CustomError('Book or user not found', 404);
      }

      // Send email after successful borrowing
      await sendEmail(borrow.user.email, 'Book Borrowed', `You have borrowed the book: ${borrow.book.title}`);
      
      return {
        message: 'Book borrowed successfully',
        borrowId: borrow.id,
        bookId: borrow.book.id,
        userId: borrow.user.id,
        borrowDate: borrow.borrowDate,
      };
    } catch (error: any) {
      if (error.message === 'Book is out of stock') {
        throw new CustomError('The book is currently out of stock', 400);
      }
      throw error;
    }
  }

  async returnBook(returnData: ReturnBookDTO) {
    const borrow = await this.borrowRepository.returnBorrow(returnData.borrowId);

    if (!borrow) {
      throw new CustomError('Borrow record not found', 404);
    }

    // Send email after successful return
    await sendEmail(borrow.user.email, 'Book Returned', `You have returned the book: ${borrow.book.title}`);

    return {
      message: 'Book returned successfully',
      borrowId: borrow.id,
      bookId: borrow.book.id,
      userId: borrow.user.id,
      borrowDate: borrow.borrowDate,
    };
  }

  async getBorrowHistory(userId: number) {
    return await this.borrowRepository.findUserBorrowHistory(userId);
  }
}
