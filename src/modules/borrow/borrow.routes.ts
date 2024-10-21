import { Router } from 'express';
import { BorrowController } from './borrow.controller';
import { authenticateJWT } from '../../middlewares/auth';
import { IGetUserAuthInfoRequest } from '../../utils/IGetUserAuthInfoRequest';

const router = Router();
const borrowController = new BorrowController();

router.post('/borrow', authenticateJWT, (req, res, next) => borrowController.borrowBook(req as IGetUserAuthInfoRequest, res, next));
router.post('/return', authenticateJWT, (req, res, next) => borrowController.returnBook(req , res, next));
router.get('/history', authenticateJWT, (req, res, next) => borrowController.getBorrowHistory(req as IGetUserAuthInfoRequest, res, next));

export default router;
