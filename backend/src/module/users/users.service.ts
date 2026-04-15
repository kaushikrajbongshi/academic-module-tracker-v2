import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateFacultyDTO } from './dto/create-faculty.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
    });
  }
}
