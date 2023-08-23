import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  email: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  //   @IsBoolean()
  //   @MinLength(30)
  //   isActive: boolean;

  //   @IsString({ each: true })
  //   @IsArray()
  //   @IsIn(['user'])
  //   roles: string[];

  // @BeforeInsert()
  // checkFileBeforeInsert() {
  //   this.email=this.email.toLowerCase().trim();
  // }
  // @BeforeUpdate()
  // checkFileBeforeUpdate() {
  //   this.email=this.email.toLowerCase().trim();
  // }
}
