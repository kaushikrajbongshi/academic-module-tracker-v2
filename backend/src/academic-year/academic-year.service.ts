import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@Injectable()
export class AcademicYearService {
  constructor(private readonly prisma: PrismaService) {}

  //create new academic year
  async createAcademicYear(data: CreateAcademicYearDto) {
    const existingAcademicYear = await this.prisma.academicYear.findUnique({
      where: { label: data.label },
    });
    if (existingAcademicYear)
      throw new ConflictException('Academic year already exists');

    try {
      return await this.prisma.academicYear.create({
        data: {
          label: data.label,
          isActive: false, 
        },
        select: {
          id: true,
          label: true,
          isActive: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create academic year');
    }
  }
}
