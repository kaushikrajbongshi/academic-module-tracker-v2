import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Admin, Faculty, Student } from 'generated/prisma/client';

type Role = 'admin' | 'faculty' | 'student';
type FacultyWithRole = Faculty & { facultyRole?: { description: string } };
type AnyUser = Admin | FacultyWithRole | Student;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string, role: string) {
    if (!this.isValidRole(role)) {
      throw new UnauthorizedException('Invalid role');
    }

    const user = await this.findUserByRole(email, role);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      role,
      faculty_role: role === 'faculty'
        ? (user as FacultyWithRole).facultyRole?.description ?? null
        : null,
      name: ('name' in user ? user.name : null) ?? ('username' in user ? user.username : null) ?? null,
    });

    return { access_token: token, role };
  }

  private isValidRole(role: string): role is Role {
    return ['admin', 'faculty', 'student'].includes(role);
  }

  private async findUserByRole(email: string, role: Role): Promise<AnyUser | null> {
    const queries: Record<Role, () => Promise<AnyUser | null>> = {
      admin:   () => this.prisma.admin.findUnique({ where: { email } }),
      faculty: () => this.prisma.faculty.findUnique({ where: { email }, include: { facultyRole: true } }),
      student: () => this.prisma.student.findUnique({ where: { email } }),
    };

    return queries[role]();
  }
}