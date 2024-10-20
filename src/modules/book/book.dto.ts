import { IsString, IsInt, Min, IsOptional, IsDateString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsDateString({},{ message: 'Published date must be a valid date (YYYY-MM-DD).' })
  publishedDate: string;

  @IsInt()
  @Min(1, { message: 'Stock must be at least 1.' })
  stock: number;
}

export class UpdateBookDTO {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsString()
  author?: string;

  @IsOptional() @IsDateString({}, { message: 'Published date must be a valid date (YYYY-MM-DD).' })
  publishedDate?: string;

  @IsOptional() @IsInt() @Min(1, { message: 'Stock must be at least 1.' })
  stock?: number;
}
