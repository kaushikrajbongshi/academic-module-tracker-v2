import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSemesterDTO } from './dto/create-semester.dto';

@Injectable()
export class SemesterService {
  constructor(private readonly prisma: PrismaService) {}

  async createSemester(data: CreateSemesterDTO) {
    const existingSemester = await this.prisma.semester.findFirst({
      where: {
        OR: [
          { semester_id: data.semester_id },
          { semester_name: data.semester_name },
        ],
      },
    });

    if (existingSemester) {
      if (existingSemester.semester_id === data.semester_id)
        throw new ConflictException('Semester ID already exists');
      if (existingSemester.semester_name === data.semester_name)
        throw new ConflictException('Semester name already exists');
    }

    try {
      return await this.prisma.semester.create({
        data: {
          semester_id: data.semester_id,
          semester_name: data.semester_name,
        },
        select: {
          semester_id: true,
          semester_name: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create semester');
    }
  }
}
