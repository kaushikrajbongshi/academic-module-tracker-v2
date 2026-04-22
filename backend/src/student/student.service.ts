import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';
import { UpdateStudentDTO } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  //create student
  async createStudent(data: CreateStudentDTO) {
    //check existing student email and id
    const existing = await this.prisma.student.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Email already exists!');
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      return this.prisma.student.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          academicYearId: data.academicYearId,
          currentSem: data.currentSem,
        },

        select: {
          email: true,
          name: true,
          password: true,
          academicYearId: true,
          currentSem: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create department');
    }
  }

  //update student
  async updateStudent(id: number, data: UpdateStudentDTO) {
    // Check student exists
    const student = await this.prisma.student.findUnique({
      where: { id },
    });
    if (!student) throw new NotFoundException('Student not found');

    // Check duplicate email (exclude current student)
    if (data.email) {
      const emailExists = await this.prisma.student.findFirst({
        where: {
          email: data.email,
          NOT: { id },
        },
      });
      if (emailExists) throw new ConflictException('Email already exists');
    }

    // FK validation - academicYear
    if (data.academicYearId) {
      const academicYear = await this.prisma.academicYear.findUnique({
        where: { id: data.academicYearId },
      });
      if (!academicYear) throw new NotFoundException('Academic year not found');
    }

    // FK validation - semester
    if (data.currentSem) {
      const semester = await this.prisma.semester.findUnique({
        where: { semester_id: data.currentSem },
      });
      if (!semester) throw new NotFoundException('Semester not found');
    }

    // Hash password if being updated
    let hashedPassword: string | undefined;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    try {
      return await this.prisma.student.update({
        where: { id },
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          currentSem: data.currentSem,
          academicYearId: data.academicYearId,
        },
        select: {
          id: true,
          studentID: true,
          email: true,
          name: true,
          currentSem: true,
          academicYearId: true,
          status: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update student');
    }
  }

  //delete student
  async deleteStudent(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });
    if (!student) throw new NotFoundException('Student not found');

    // Already deleted
    if (student.status === 'D')
      throw new ConflictException('Student is already deactivated');

    try {
      return await this.prisma.student.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete student');
    }
  }
}
