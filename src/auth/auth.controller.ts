import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req) {
    return req.user;
  }
}
