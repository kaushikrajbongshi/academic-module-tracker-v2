import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  IsInt,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateStudentDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @Length(2, 2) // "01", "02"
  currentSem?: string;

  @IsInt()
  @Type(() => Number)
  academicYearId: number;
}
