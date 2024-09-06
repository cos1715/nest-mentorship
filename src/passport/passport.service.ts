import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passport } from './entity';
import { PassportDto } from './dto';
import { User } from 'src/user/entity';

@Injectable()
export class PassportService {
  constructor(
    @InjectRepository(Passport)
    private passportRepository: Repository<Passport>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findPassport(id: string): Promise<Passport> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.passport', 'passport')
      .where('user.id = :id', { id })
      .getOne();
    // how use correct query builder to get passport
    // const passport = await this.userRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.passport', 'passport')
    //   .where('user.id = :id', { id })
    //   .select('passport')
    //   .getRawOne();

    return user.passport;
  }

  async createPassport(id: string, data: PassportDto): Promise<Passport> {
    const passport = await this.findPassport(id);
    if (passport) {
      throw new HttpException('Passport already exists', 400);
    }
    const newPassport = this.passportRepository.create(data);
    await this.passportRepository.save(newPassport);
    return newPassport;
  }

  async updatePassport(userId: string, data: PassportDto): Promise<Passport> {
    const passport = await this.findPassport(userId);
    if (data.code === passport.code) {
      const newPassport: Passport = { ...passport, ...data };
      await this.passportRepository.update(data.code, newPassport);
      return newPassport;
    } else {
      throw new HttpException('Unauthorized', 403);
    }
  }
}
