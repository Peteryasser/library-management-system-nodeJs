import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Check } from 'typeorm';
import { Borrow } from './Borrow';

@Entity()
@Check(`"stock" >= 0`)
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'date' })
  publishedDate: Date;

  @Column({ default: 1 })
  stock: number;

  @Column({ default: 0 })
  totalBorrowed: number;

  @OneToMany(() => Borrow, (borrow) => borrow.book, { onDelete: 'CASCADE' })
  borrows!: Borrow[];
}
