import { CreateFacultyDTO } from "./create-faculty.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFacultyDTO extends PartialType(CreateFacultyDTO){}