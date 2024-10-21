import { IsInt, IsDateString } from 'class-validator';

export class BorrowBookDTO {
  @IsInt({ message: 'Book ID must be a valid integer' })
  bookId: number;

}

export class ReturnBookDTO {
  @IsInt({ message: 'Borrow ID must be a valid integer' })
  borrowId: number;  // The ID of the borrow record
}

export class BorrowHistoryDTO {
  @IsDateString({},{ message: 'Return date must be a valid date' })
  returnDate: string;
}
