import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  IsInt,
  IsOptional,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateStudentDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  @Length(2, 2) // "01", "02"
  currentSem?: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  academicYearId!: number;
}
