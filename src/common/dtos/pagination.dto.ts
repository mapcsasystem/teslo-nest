import { IsPositive, IsOptional, Min } from 'class-validator';
// import { Type } from 'class-transformer';
export class PaginationDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) //! Tranformar implisitamente a número
  limit?: number;

  @IsOptional()
  @Min(0)
  // @Type(() => Number) //! Tranformar implisitamente a número
  offset?: number;
}
