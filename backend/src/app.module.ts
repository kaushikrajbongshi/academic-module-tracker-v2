import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DepartmentModule } from './department/department.module';
import { CourseModule } from './course/course.module';
import { SemesterModule } from './semester/semester.module';
import { AcademicYearController } from './academic-year/academic-year.controller';
import { AcademicYearModule } from './academic-year/academic-year.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DepartmentModule,
    CourseModule,
    SemesterModule,
    AcademicYearModule,
  ],
  controllers: [AppController, AcademicYearController],
  providers: [AppService],
})
export class AppModule {}
