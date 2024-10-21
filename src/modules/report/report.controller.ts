import { Request, Response, NextFunction } from 'express';
import { ReportService } from './report.service';

export class ReportController {
  private reportService = new ReportService();

  async getBorrowedBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await this.reportService.getBorrowedBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async getPopularBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await this.reportService.getPopularBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
}
