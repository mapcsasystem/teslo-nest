import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratery } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //! registrar modulo asyncrono
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {
            expiresIn: '30d',
          },
        };
      },
    }),
    //! registrar modulo no asyncrono
    // JwtModule.register({
    //   secret: process.env.SECRET_KEY,
    //   signOptions: {
    //     expiresIn: '30d',
    //   },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratery],
  exports: [TypeOrmModule, JwtStratery, PassportModule, JwtModule],
})
export class AuthModule {}
