import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto';
import { User } from './entity/user.entity';
import { Education } from '../education/entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['contacts', 'passport', 'education'],
      select: ['id', 'name', 'email', 'contacts', 'passport', 'education'],
    });
    return users;
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['contacts', 'passport', 'education'],
      select: ['id', 'name', 'email', 'contacts', 'passport', 'education'],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToInstance(User, createUserDto);
    if (user.password) {
      try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      } catch {
        throw new HttpException('Error hashing password', 500);
      }
    }
    if (user.education && user.education.length > 0) {
      const educationEntities = await Promise.all(
        user.education.map(async (eduDto) => {
          const education = await this.educationRepository.findOne({
            where: { degree: eduDto.degree, facilityName: eduDto.facilityName },
          });

          if (!education) {
            return plainToInstance(Education, eduDto);
          }

          return education;
        }),
      );
      user.education = educationEntities;
    }

    return this.usersRepository.save(user);
  }

  async createBulk(data: CreateUserDto[]): Promise<User[]> {
    const users = await Promise.all(
      data.map(async (user) => {
        const data = plainToInstance(User, user);
        if (data.password) {
          try {
            const hash = await bcrypt.hash(data.password, 10);
            data.password = hash;
          } catch {
            throw new HttpException('Error hashing password', 500);
          }
          if (user.education) {
            const educations = this.educationRepository.create(user.education);
            await this.educationRepository.save(educations);
            user.education = educations;
          }
        }
        return data;
      }),
    );
    return this.usersRepository.save(users);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    if (user.password) {
      try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      } catch {
        throw new HttpException('Error hashing password', 500);
      }
    }

    if (user.education) {
      const educations = this.educationRepository.create(user.education);
      await this.educationRepository.save(educations);
      user.education = educations;
    }
    await this.usersRepository.save({ id, ...user });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
