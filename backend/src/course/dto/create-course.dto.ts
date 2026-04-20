import { IsString, Length, MinLength } from 'class-validator';

export class CreateCourseDTO {
  @IsString()
  @MinLength(2)
  course_id: string;

  @IsString()
  @MinLength(2)
  course_name: string;

  @IsString()
  @Length(2, 2) // e.g., "01", "02"
  semester_id: string;

  @IsString()
  @MinLength(2)
  dept_id: string;
}