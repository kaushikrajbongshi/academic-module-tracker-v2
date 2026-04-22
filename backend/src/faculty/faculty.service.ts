import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFacultyDTO } from './dto/create-faculty.dto';
import { UpdateFacultyDTO } from './dto/update-faculty.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FacultyService {
  constructor(private readonly prisma: PrismaService) {}

  // Create faculty
  async createFaculty(data: CreateFacultyDTO) {
    // Check duplicate faculty_id or email
    const existing = await this.prisma.faculty.findFirst({
      where: {
        OR: [
          { faculty_id: data.faculty_id },
          { email: data.email },
          { username: data.username },
        ],
      },
    });

    if (existing) {
      if (existing.faculty_id === data.faculty_id)
        throw new ConflictException('Faculty ID already exists');
      if (existing.email === data.email)
        throw new ConflictException('Email already exists');
      if (existing.username === data.username)
        throw new ConflictException('Username already exists');
    }

    // Validate FK - department
    const department = await this.prisma.department.findUnique({
      where: { dept_id: data.dept_id },
    });
    if (!department) throw new NotFoundException('Department not found');

    // Validate FK - role
    const role = await this.prisma.faculty_Role.findUnique({
      where: { id: data.role },
    });
    if (!role) throw new NotFoundException('Role not found');

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      return await this.prisma.faculty.create({
        data: {
          faculty_id: data.faculty_id,
          email: data.email,
          username: data.username,
          name: data.name,
          password: hashedPassword,
          role: data.role,
          dept_id: data.dept_id,
        },
        select: {
          id: true,
          faculty_id: true,
          email: true,
          username: true,
          name: true,
          role: true,
          dept_id: true,
          status: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create faculty');
    }
  }

  // Update faculty
  async updateFaculty(id: number, data: UpdateFacultyDTO) {
    // Check faculty exists
    const faculty = await this.prisma.faculty.findUnique({
      where: { id },
    });
    if (!faculty) throw new NotFoundException('Faculty not found');

    // Check duplicate email/username (exclude current faculty)
    if (data.email || data.username) {
      const orConditions: { email?: string; username?: string }[] = [];
      if (data.email) orConditions.push({ email: data.email });
      if (data.username) orConditions.push({ username: data.username });

      const existing = await this.prisma.faculty.findFirst({
        where: {
          OR: orConditions,
          NOT: { id },
        },
      });

      if (existing) {
        if (existing.email === data.email)
          throw new ConflictException('Email already exists');
        if (existing.username === data.username)
          throw new ConflictException('Username already exists');
      }
    }

    // FK validation
    if (data.dept_id) {
      const department = await this.prisma.department.findUnique({
        where: { dept_id: data.dept_id },
      });
      if (!department) throw new NotFoundException('Department not found');
    }

    if (data.role) {
      const role = await this.prisma.faculty_Role.findUnique({
        where: { id: data.role },
      });
      if (!role) throw new NotFoundException('Role not found');
    }

    // Hash password if being updated
    let hashedPassword: string | undefined;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    try {
      return await this.prisma.faculty.update({
        where: { id },
        data: {
          email: data.email,
          username: data.username,
          name: data.name,
          password: hashedPassword,
          role: data.role,
          dept_id: data.dept_id,
        },
        select: {
          id: true,
          faculty_id: true,
          email: true,
          username: true,
          name: true,
          role: true,
          dept_id: true,
          status: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update faculty');
    }
  }

  // Delete faculty (soft delete)
  async deleteFaculty(id: number) {
    const faculty = await this.prisma.faculty.findUnique({
      where: { id },
    });
    if (!faculty) throw new NotFoundException('Faculty not found');

    try {
      return await this.prisma.faculty.delete({
        where: { id },
        select: {
          email: true,
          name: true,
          username: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete faculty');
    }
  }
}
