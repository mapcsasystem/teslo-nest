import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, RoleProtected } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('test-private')
  @UseGuards(AuthGuard())
  testJwtPrivate(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }

  @Get('test-private2')
  @SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  testJwtPrivate2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('test-private3')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testJwtPrivate3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('test-private4')
  @Auth(ValidRoles.admin) //! ValidRoles.admin   se le manda para validar que role nesesita validar
  testJwtPrivate4(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
