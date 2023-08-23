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
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    uniqueItems: true,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  //   @Transform(({ value }) => value.trim())
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
