import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department-dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  //create department
  async createDepartment(data: CreateDepartmentDTO) {
    // Check duplicate dept_id OR dept_name
    const existing = await this.prisma.department.findFirst({
      where: {
        OR: [{ dept_id: data.dept_id }, { dept_name: data.dept_name }],
      },
    });

    if (existing) {
      if (existing.dept_id === data.dept_id)
        throw new ConflictException('Department ID already exists');
      if (existing.dept_name === data.dept_name)
        throw new ConflictException('Department name already exists');
    }

    // Create department
    try {
      return await this.prisma.department.create({
        data: {
          dept_id: data.dept_id,
          dept_name: data.dept_name,
        },
        select: {
          dept_id: true,
          dept_name: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create department');
    }
  }

  //update deparment
  async updateDepartment(dept_id: string, data: UpdateDepartmentDto) {
    // Check if department exists
    const department = await this.prisma.department.findUnique({
      where: { dept_id },
    });

    if (!department) throw new NotFoundException('Department not found');

    // Check if new dept_name is already taken by another department
    if (data.dept_name) {
      const nameExists = await this.prisma.department.findFirst({
        where: {
          dept_name: data.dept_name,
          NOT: { dept_id }, // exclude current department
        },
      });

      if (nameExists)
        throw new ConflictException('Department name already exists');
    }

    // Update
    try {
      return await this.prisma.department.update({
        where: { dept_id },
        data: {
          dept_name: data.dept_name,
        },
        select: {
          dept_id: true,
          dept_name: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update department');
    }
  }
}
