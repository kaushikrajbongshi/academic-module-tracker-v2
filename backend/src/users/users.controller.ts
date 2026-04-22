import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminDTO } from './dto/create-admin.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('admin')
  createAdmin(@Body() dto: CreateAdminDTO) {
    return this.userService.createAdmin(dto);
  }
}
