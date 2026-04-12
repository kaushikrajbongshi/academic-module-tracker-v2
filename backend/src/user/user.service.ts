import { Injectable } from '@nestjs/common';
import { Admin } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // GET all users
  getUser(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }
}
