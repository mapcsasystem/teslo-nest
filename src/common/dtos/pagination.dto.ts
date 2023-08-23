import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsOptional, Min } from 'class-validator';
// import { Type } from 'class-transformer';
export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'haw many to you want',
  })
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) //! Tranformar implisitamente a número
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Optional',
  })
  @IsOptional()
  @Min(0)
  // @Type(() => Number) //! Tranformar implisitamente a número
  offset?: number;
}
