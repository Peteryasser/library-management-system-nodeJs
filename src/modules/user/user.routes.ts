import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', (req, res, next) => userController.register(req, res, next));
router.post('/login', (req, res, next) => userController.login(req, res, next));

export default router;
