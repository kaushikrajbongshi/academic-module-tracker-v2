import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@Controller('academic-year')
export class AcademicYearController {
  constructor(private readonly academicYear: AcademicYearService) {}

  @Post()
  async createAcademicYear(@Body() dto: CreateAcademicYearDto) {
    return this.academicYear.createAcademicYear(dto);
  }

  @Patch(':id/activate')
  async setActiveYear(@Param('id', ParseIntPipe) id: number) {
    return this.academicYear.setActiveYear(id);
  }
}
