import jwt from 'jsonwebtoken';

export const generateToken = (userId: number, role: 'user' | 'admin') => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',  // Token expires in 1 hour
  });
};
