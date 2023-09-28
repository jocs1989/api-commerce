import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './authentication/auth.service';
import { LocalAuthGuard } from './authentication/guard/jwt/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enumeration/rol.enum';
@Controller('auth')
export class IamController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Roles(Role.USER, Role.SUPERUSER)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('Si funciona');
    return req.user;
  }
}
