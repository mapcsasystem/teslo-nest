import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCloudinaryDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  url: string;
}
