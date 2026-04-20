import { Body, Controller, Post } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDTO } from './dto/create-semester.dto';

@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post()
  async createSemester(@Body() dto: CreateSemesterDTO) {
    return this.semesterService.createSemester(dto);
  }
}
