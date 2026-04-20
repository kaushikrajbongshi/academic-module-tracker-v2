import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSemesterDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  semester_id!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  semester_name!: string;
}
