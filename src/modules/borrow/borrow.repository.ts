import { AppDataSource } from '../../data-source';
import { Borrow } from '../../entities/Borrow';
import { Book } from '../../entities/Book';
import { User } from '../../entities/User';
import { IsNull } from 'typeorm';

export class BorrowRepository {
  private borrowRepo = AppDataSource.getRepository(Borrow);
  private bookRepo = AppDataSource.getRepository(Book);
  private userRepo = AppDataSource.getRepository(User);

  async createBorrow(userId: number, bookId: number) {
    // Fetch the book and user
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!book || !user) return null;  // If book or user is not found
    
     // Check if the user already borrowed this book and hasn't returned it yet
    const existingBorrow = await this.borrowRepo.findOne({ 
      where: { user: { id: userId }, book: { id: bookId }, returnDate: IsNull() } 
    });

    if (existingBorrow) {
      throw new Error('You already have this book borrowed');
    }

    // Ensure stock is available before creating the borrow record
    if (book.stock <= 0) {
      throw new Error('Book is out of stock');
    }

    // Create a new borrow record
    const borrow = this.borrowRepo.create({
      user,
      book,
      borrowDate: new Date()
    });

    // Update the book's stock and total borrowed count
    book.stock -= 1;         // Decrease stock
    book.totalBorrowed += 1;  // Increase total borrowed count

    // Save both the borrow record and the updated book entity
    await this.bookRepo.save(book);
    return await this.borrowRepo.save(borrow);
  }

  async findBorrowById(borrowId: number) {
    return await this.borrowRepo.findOne({ where: { id: borrowId }, relations: ['book', 'user'] });
  }

  async returnBorrow(borrowId: number) {
    const borrow = await this.findBorrowById(borrowId);
    if (!borrow) return null;

    // Check if the book has already been returned
    if (borrow.returnDate !== null) {
      throw new Error('This book has already been returned');
    }

    // Update the borrow record's return date
    borrow.returnDate = new Date();

    // Increase the book's stock since it's being returned
    const book = await this.bookRepo.findOne({ where: { id: borrow.book.id } });
    if (book) {
      book.stock += 1;
      await this.bookRepo.save(book);
    }

    return await this.borrowRepo.save(borrow);
  }

  async findUserBorrowHistory(userId: number) {
    return await this.borrowRepo.find({ where: { user: { id: userId } }, relations: ['book'] });
  }
}
