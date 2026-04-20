import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() dto: CreateCourseDTO) {
    return this.courseService.createCourse(dto);
  }

  @Put(':course_id')
  async updateCourse(
    @Param('course_id') course_id: string,
    @Body() dto: UpdateCourseDTO,
  ) {
    return this.courseService.updateCourse(course_id, dto);
  }
}
