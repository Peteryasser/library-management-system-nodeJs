import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO, ReturnUserDTO } from './user.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '../../utils/customError';

export class UserController {
  private userService = new UserService();

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userData = plainToInstance(CreateUserDTO, req.body);  // Transform request body to DTO
    const errors = await validate(userData);  // Validate DTO

    if (errors.length > 0) {
      const validationMessages = errors.map(err => Object.values(err.constraints!)).join(', ');
      return next(new CustomError(`Validation failed: ${validationMessages}`, 400));
    }

    try {
      const user = await this.userService.registerUser(userData);
      const returnedUser: ReturnUserDTO = {
        name: user.name,
        email: user.email,
        role: user.role
      }
      res.status(201).json({ message: 'User registered successfully', returnedUser });
    } catch (error) {
      next(error);  // Pass error to the centralized error handler
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const loginData = plainToInstance(LoginUserDTO, req.body);
    const errors = await validate(loginData);

    if (errors.length > 0) {
      const validationMessages = errors.map(err => Object.values(err.constraints!)).join(', ');
      return next(new CustomError(`Validation failed: ${validationMessages}`, 400));
    }

    try {
      const token = await this.userService.loginUser(loginData);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
