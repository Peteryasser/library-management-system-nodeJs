import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()  // Optional, default will be 'user'
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: 'user' | 'admin';
}

export interface ReturnUserDTO{
    name: string;
    email: string;
    role: string;
  }

export class LoginUserDTO {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
