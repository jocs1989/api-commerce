import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from 'src/iam/decorators/roles.decorator';
import { Role } from 'src/iam/enumeration/rol.enum';
import { Payload } from 'src/iam/interface/payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflactor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflactor.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.rol?.includes(role));
  }
}
