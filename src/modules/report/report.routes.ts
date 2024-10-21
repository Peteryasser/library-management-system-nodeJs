import { Router } from 'express';
import { ReportController } from './report.controller';
import { authenticateJWT, authorizeAdmin } from '../../middlewares/auth';

const router = Router();
const reportController = new ReportController();

router.get('/borrowed', authenticateJWT, authorizeAdmin, (req, res, next) => reportController.getBorrowedBooks(req, res, next));
router.get('/popular', authenticateJWT, authorizeAdmin, (req, res, next) => reportController.getPopularBooks(req, res, next));

export default router;
