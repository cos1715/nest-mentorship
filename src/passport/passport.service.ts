import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passport } from './entity';
import { PassportDto, UpdatePassportDto } from './dto';
import { User } from 'src/user/entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PassportService {
  constructor(
    @InjectRepository(Passport)
    private passportRepository: Repository<Passport>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async getPassport(code: string): Promise<Passport> {
    return this.passportRepository.findOne({ where: { code } });
  }

  async findPassport(id: string): Promise<Passport> {
    const passport = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.passport', 'passport')
      .where('user.id = :id', { id })
      .select('passport.code', 'code')
      .addSelect('passport.issuedDate', 'issueDate')
      .getRawOne<Passport>();

    return passport;
  }

  async createPassport(id: string, data: PassportDto): Promise<Passport> {
    const passport = await this.findPassport(id);
    const passportExist = await this.getPassport(data.code);
    if (passport || passportExist) {
      throw new HttpException('Passport already exists', 405);
    }

    const newPassport = this.passportRepository.create(data);
    this.userService.update(id, {
      passport: newPassport,
    });
    return newPassport;
  }

  async updatePassport(
    userId: string,
    data: UpdatePassportDto,
  ): Promise<Passport> {
    const passport = await this.findPassport(userId);
    const newPassport: Passport = { ...passport, ...data };
    this.passportRepository.delete({ code: passport.code });
    await this.userService.update(userId, {
      passport: newPassport,
    });
    return newPassport;
  }
}
