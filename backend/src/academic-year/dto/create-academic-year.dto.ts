import { IsString, Matches } from 'class-validator';

export class CreateAcademicYearDto {
  @IsString()
  @Matches(/^\d{4}-\d{4}$/, { message: 'Label must be in format YYYY-YYYY' })
  label: string;
}
