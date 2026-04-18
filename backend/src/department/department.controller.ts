import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department-dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('new')
  async createDepartment(@Body() dto: CreateDepartmentDTO) {
    return this.departmentService.createDepartment(dto);
  }

  @Put(':dept_id')
  async updateDepartment(
    @Param('dept_id') dept_id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.departmentService.updateDepartment(dept_id, dto);
  }
}
