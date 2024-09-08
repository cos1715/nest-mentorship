import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['contacts', 'passport', 'education'],
    });
  }

  // login password
  // guard with token

  // only with first nested element
  // use query builder for nested elements
  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find({
  //     relations: ['contacts', 'passport', 'education'],
  //   });
  // }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['contacts', 'passport', 'education'],
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
        }
        return data;
      }),
    );
    return this.usersRepository.save(users);
  }

  // ask to check this function
  async update(id: string, user: Partial<User>): Promise<User> {
    if (user.password) {
      try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      } catch {
        throw new HttpException('Error hashing password', 500);
      }
    }

    await this.usersRepository.save({ id, ...user });
    // await this.contactsRepository.delete({ user: { id } });
    // // why it failed
    // // await this.contactsRepository.remove(contacts);
    // const newContacts = contacts.map((contact) => {
    //   const newContact = plainToInstance(Contact, contact);
    //   newContact.userId = id;
    //   return newContact;
    // });

    // await this.contactsRepository.save(newContacts);
    return this.findOne(id);
  }

  // ask to check this function
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    // await this.contactsRepository.delete({ user: { id } });
    await this.usersRepository.remove(user);
  }
}
