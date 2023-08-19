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

  @IsNumber()
  //   @Transform(({ value }) => value.trim())
  @IsPositive()
  @IsOptional()
  price?: number;

  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  @MinLength(1)
  description: string;

  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @Transform(({ value }) => value.toLowerCase().trim())
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
