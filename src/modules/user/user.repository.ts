import { AppDataSource } from '../../data-source';
import { User } from '../../entities/User';
import { CreateUserDTO } from './user.dto';

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDTO): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }
}
