import { IsEmail, IsInt, IsString, Length } from 'class-validator';

export class CreateFacultyDTO {
  @IsString()
  @Length(1, 20)
  faculty_id: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 100)
  username: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsInt()
  role: number;

  @IsString()
  @Length(1, 10)
  dept_id: string;
}