import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Number of items per page (default: 25, max: 1000)',
    example: 10,
    minimum: 1,
    maximum: 1000,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(1000)
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Current page number (default: 1)',
    example: 1,
    minimum: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @Min(1)
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;
}
