import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards';
import { Public } from '../decorators';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req) {
    return this.authService.passportSignIn(req.user);
  }
}
