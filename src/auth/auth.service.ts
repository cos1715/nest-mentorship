import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: AuthDto): Promise<string> {
    const user = await this.usersService.findOneByEmail(email);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
