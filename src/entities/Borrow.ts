import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  book: Book;

  @Column({ type: 'date' })
  borrowDate: Date;

  @Column({ type: 'date', nullable: true })
  returnDate: Date;
}
