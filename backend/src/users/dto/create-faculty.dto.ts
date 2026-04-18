import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFacultyDTO {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  faculty_id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  role: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  dept_id: string;
}
