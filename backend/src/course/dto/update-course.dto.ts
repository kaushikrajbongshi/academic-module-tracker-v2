import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCourseDTO {
  @IsOptional()
  @IsString()
  course_name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  semester_id?: string;

  @IsOptional()
  @IsString()
  dept_id?: string;
}
