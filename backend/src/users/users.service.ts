import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateFacultyDTO } from './dto/create-faculty.dto';
import { CreateStudentDTO } from './dto/create-student.dto';
import { CreateAdminDTO } from './dto/create-admin.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  //for Admin
  async createAdmin(data: CreateAdminDTO) {
    //check the email
    const existing = await this.prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException('Email Already Exists!');
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    //create Admin
    try {
      return this.prisma.admin.create({
        data: {
          email: data.email,
          username: data.username,
          password: hashedPassword,
        },
        select: {
          email: true,
          username: true,
          password: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create department');
    }
  }

  //for faculty
  async createFaculty(data: CreateFacultyDTO) {
    // check for already existing
    const existing = await this.prisma.faculty.findFirst({
      where: { OR: [{ email: data.email }, { faculty_id: data.faculty_id }] },
    });

    if (existing) {
      if (existing.email === data.email) {
        throw new ConflictException('Email already exists!');
      }
      if (existing.faculty_id === data.faculty_id) {
        throw new ConflictException('Faculty ID already exists!');
      }
    }

    //hashed password before store
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      return this.prisma.faculty.create({
        data: {
          email: data.email,
          faculty_id: data.faculty_id,
          username: data.username,
          name: data.name,
          password: hashedPassword,
          role: data.role,
          dept_id: data.dept_id,
        },

        select: {
          email: true,
          faculty_id: true,
          username: true,
          name: true,
          password: true,
          role: true,
          dept_id: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create department');
    }
  }

  //for student
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
}
