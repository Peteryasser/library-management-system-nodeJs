import { Router } from 'express';
import { BookController } from './book.controller';
import { authenticateJWT, authorizeAdmin } from '../../middlewares/auth';

const router = Router();
const bookController = new BookController();

router.get('/', (req, res, next) => bookController.getAvailableBooks(req, res, next));  // Public route
router.post('/', authenticateJWT, authorizeAdmin, (req, res, next) => bookController.createBook(req, res, next));  // Admin only
router.put('/:id', authenticateJWT, authorizeAdmin, (req, res, next) => bookController.updateBook(req, res, next));  // Admin only
router.delete('/:id', authenticateJWT, authorizeAdmin, (req, res, next) => bookController.deleteBook(req, res, next));  // Admin only

export default router;
