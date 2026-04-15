import { Body, Controller, Post } from '@nestjs/common';
import { CreateFacultyDTO } from './dto/create-faculty.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create-faculty')
  crateFaculty(@Body() dto: CreateFacultyDTO) {
    return this.userService.createFaculty(dto);
  }
}
