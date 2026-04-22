import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('student')
  createStudent(@Body() dto: CreateStudentDTO) {
    return this.studentService.createStudent(dto);
  }

  @Patch(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateStudentDTO,
  ) {
    return this.studentService.updateStudent(id, data);
  }


  @Delete(':id')
  deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
