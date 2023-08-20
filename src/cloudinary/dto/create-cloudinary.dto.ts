import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateCloudinaryDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  url: string;
}
