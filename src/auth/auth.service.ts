import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true },
      });
      if (!user) {
        throw new UnauthorizedException('email or password is incorrect');
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('email or password is incorrect');
      }
      return {
        ...user,
        token: this.getJwtToken({ email: user.email, id: user.id }),
      };
    } catch (error) {}
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userProperties } = createUserDto;

      const user = this.userRepository.create({
        ...userProperties,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      await this.userRepository.save(user);
      return {
        ...user,
        token: this.getJwtToken({ email: user.email, id: user.id }),
      };
    } catch (error) {
      this.handleDBExeption(error);
    }

    return createUserDto;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

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
