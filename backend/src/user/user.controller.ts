import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { RequireLevel } from 'src/common/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards( JwtAuthGuard, RolesGuard)
  @RequireLevel(4)
  @Get()
  getCustomers() {
    return this.userService.getUser();
  }
}
