import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateCloudinaryDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  url?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  public_id?: string;
}
