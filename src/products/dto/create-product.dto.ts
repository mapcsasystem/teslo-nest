import {
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  IsArray,
  IsIn,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateProductDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  title: string;

  @Transform(({ value }) => value.trim())
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  description: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  slug?: string;

  @Transform(({ value }) => value.trim())
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @Transform(({ value }) => value.trim())
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @Transform(({ value }) => value.trim())
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  // TODO:  create tags, images
}
