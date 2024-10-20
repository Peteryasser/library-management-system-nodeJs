import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import bcrypt from 'bcryptjs';
import { CustomError } from '../../utils/customError';
import { generateToken } from '../../utils/jwt';

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userData: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const role = userData.role || 'user';

    try {
      return this.userRepository.createUser({ ...userData, password: hashedPassword, role });
    } catch (error: any) {
      throw new CustomError('An unexpected error occurred while registering the user.', 500);
    }
  }
  
  async loginUser(credentials: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new CustomError('Invalid credentials', 401);
    }
    return generateToken(user.id, user.role);
  }
}


