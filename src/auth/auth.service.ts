import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto';
import { User } from '../user/entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }

  async signIn({ email, password }: AuthDto): Promise<string> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async passportSignIn(user: Partial<User>): Promise<string> {
    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
