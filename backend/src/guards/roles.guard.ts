import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth/auth.service';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Array<string> = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles.length) return true;

    const request = context.switchToHttp().getRequest();

    const userRole = request?.user?.role;

    if (!userRole) return false;

    const isAuthorized = roles.indexOf(userRole) >= 0;

    return isAuthorized;
  }
}
