import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentDTO {
  @IsString()
  @IsNotEmpty()
  dept_id!: string;

  @IsString()
  @IsNotEmpty()
  dept_name!: string;
}
