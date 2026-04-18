import { Body, Controller, Post } from '@nestjs/common';
import { CreateFacultyDTO } from './dto/create-faculty.dto';
import { UsersService } from './users.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import { CreateAdminDTO } from './dto/create-admin.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('admin')
  createAdmin(@Body() dto: CreateAdminDTO) {
    return this.userService.createAdmin(dto);
  }

  @Post('faculty')
  crateFaculty(@Body() dto: CreateFacultyDTO) {
    return this.userService.createFaculty(dto);
  }

  @Post('student')
  createStudent(@Body() dto: CreateStudentDTO) {
    return this.userService.createStudent(dto);
  }
}
