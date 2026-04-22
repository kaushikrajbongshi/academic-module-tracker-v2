import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
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
}
