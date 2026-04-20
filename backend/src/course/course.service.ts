import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(data: CreateCourseDTO) {
    // Check if dept and semester exist
    const department = await this.prisma.department.findUnique({
      where: { dept_id: data.dept_id },
    });
    if (!department) throw new NotFoundException('Department not found');

    const semester = await this.prisma.semester.findUnique({
      where: { semester_id: data.semester_id },
    });
    if (!semester) throw new NotFoundException('Semester not found');

    // Check duplicate course_id or course_name
    const existing = await this.prisma.course.findFirst({
      where: {
        OR: [{ course_id: data.course_id }, { course_name: data.course_name }],
      },
    });

    if (existing) {
      if (existing.course_id === data.course_id)
        throw new ConflictException('Course ID already exists');
      if (existing.course_name === data.course_name)
        throw new ConflictException('Course name already exists');
    }

    // Create
    try {
      return await this.prisma.course.create({
        data: {
          course_id: data.course_id,
          course_name: data.course_name,
          semester_id: data.semester_id,
          dept_id: data.dept_id,
        },
        select: {
          course_id: true,
          course_name: true,
          semester_id: true,
          dept_id: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create course');
    }
  }

  // update course
  async updateCourse(course_id: string, data: UpdateCourseDTO) {
    // Check course exists
    const course = await this.prisma.course.findUnique({
      where: { course_id: course_id },
    });
    if (!course) throw new NotFoundException('Course not found');

    // FK validations (only if fields are being updated)
    if (data.dept_id) {
      const department = await this.prisma.department.findUnique({
        where: { dept_id: data.dept_id },
      });
      if (!department) throw new NotFoundException('Department not found');
    }

    if (data.semester_id) {
      const semester = await this.prisma.semester.findUnique({
        where: { semester_id: data.semester_id },
      });
      if (!semester) throw new NotFoundException('Semester not found');
    }

    // Duplicate course_name check (exclude current course)
    if (data.course_name) {
      const nameExists = await this.prisma.course.findFirst({
        where: {
          course_name: data.course_name,
          NOT: { course_id },
        },
      });
      if (nameExists) throw new ConflictException('Course name already exists');
    }

    // Update
    try {
      return await this.prisma.course.update({
        where: { course_id },
        data: {
          course_name: data.course_name,
          dept_id: data.dept_id,
          semester_id: data.semester_id,
        },
        select: {
          course_id: true,
          course_name: true,
          dept_id: true,
          semester_id: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update course');
    }
  }
}
