import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refecltor: Reflector) {}

  getUserLevel(user: any): number {
    if (user.role === 'admin') return 4;

    if (user.role === 'faculty') {
      const facultyRole = user.faculty_role?.toUpperCase();

      if (facultyRole === 'HOD') return 3;

      return 2;
    }

    return 1;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireLevel = this.refecltor.get<number>(
      ROLE_KEY,
      context.getHandler(),
    );

    //for public api
    if (!requireLevel) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('No user found');
    }

    const userLevel = this.getUserLevel(user);

    //compare user with the level
    if (userLevel < requireLevel) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
