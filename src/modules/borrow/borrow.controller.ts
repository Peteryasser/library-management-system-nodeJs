import { Request, Response, NextFunction } from 'express';
import { BorrowService } from './borrow.service';
import { BorrowBookDTO, ReturnBookDTO } from './borrow.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '../../utils/customError';
import { IGetUserAuthInfoRequest } from '../../utils/IGetUserAuthInfoRequest';


export class BorrowController {
  private borrowService = new BorrowService();

  async borrowBook(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> {
    const borrowData = plainToInstance(BorrowBookDTO, req.body);
    const errors = await validate(borrowData);

    if (errors.length > 0) {
      const validationMessages = errors.map(err => Object.values(err.constraints!)).join(', ');
      return next(new CustomError(`Validation failed: ${validationMessages}`, 400));
    }

    try {
      const borrow = await this.borrowService.borrowBook(req.user.id, borrowData);
      res.status(201).json({ message: 'Book borrowed successfully', borrow });
    } catch (error) {
      next(error);
    }
  }

  async returnBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const returnData = plainToInstance(ReturnBookDTO, req.body);
    const errors = await validate(returnData);

    if (errors.length > 0) {
      const validationMessages = errors.map(err => Object.values(err.constraints!)).join(', ');
      return next(new CustomError(`Validation failed: ${validationMessages}`, 400));
    }

    try {
      const borrow = await this.borrowService.returnBook(returnData);
      res.status(200).json({ message: 'Book returned successfully', borrow });
    } catch (error) {
      next(error);
    }
  }

  async getBorrowHistory(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const history = await this.borrowService.getBorrowHistory(req.user.id);
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }
}