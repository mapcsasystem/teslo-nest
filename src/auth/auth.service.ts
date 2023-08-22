import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  login() {
    return 'This action adds a new auth';
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { ...userProperties } = createUserDto;
      const user = this.userRepository.create({
        ...userProperties,
      });
      await this.userRepository.save(user);
      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDBExeption(error);
    }

    return createUserDto;
  }

  private findUser(id: string) {}

  private handleDBExeption(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    if (error.code === '23502') {
      throw new BadRequestException(`#${error.column} violates not-null.`);
    }
    console.log({ error });
    this.logger.error(error);
    throw new InternalServerErrorException('Create user check error');
  }
}
