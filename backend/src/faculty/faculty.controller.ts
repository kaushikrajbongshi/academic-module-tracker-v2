import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDTO } from './dto/create-faculty.dto';
import { UpdateFacultyDTO } from './dto/update-faculty.dto';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  createFaculty(@Body() data: CreateFacultyDTO) {
    return this.facultyService.createFaculty(data);
  }

  @Patch(':id')
  updateFaculty(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFacultyDTO,
  ) {
    return this.facultyService.updateFaculty(id, data);
  }

  @Delete(':id')
  deleteFaculty(@Param('id', ParseIntPipe) id: number) {
    return this.facultyService.deleteFaculty(id);
  }
}
