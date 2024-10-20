import { Request } from 'express';
import { User } from '../entities/User';

export interface IGetUserAuthInfoRequest extends Request {
  user: User;  
}