import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

  //Active a new academic year
  async setActiveYear(id: number) {
    const existingAcademicYear = await this.prisma.academicYear.findUnique({
      where: { id },
    });
    if (!existingAcademicYear)
      throw new NotFoundException('Academic year not found');

    try {
      await this.prisma.$transaction([
        this.prisma.academicYear.updateMany({
          where: { isActive: true },
          data: { isActive: false },
        }),
        this.prisma.academicYear.update({
          where: { id },
          data: { isActive: true },
        }),
      ]);

      return { message: `"${existingAcademicYear.label}" is now active` };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to activate academic year',
      );
    }
  }
}
