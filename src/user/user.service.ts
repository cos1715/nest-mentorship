import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { Contacts } from '../contacts/entity/contacts.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Contacts)
    private contactsRepository: Repository<Contacts>,
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
      relations: ['contacts', 'passport'],
    });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToInstance(User, createUserDto);
    return this.usersRepository.save(user);
  }

  createBulk(data: CreateUserDto[]): Promise<User[]> {
    const users = data.map((user) => plainToInstance(User, user));
    return this.usersRepository.save(users);
  }

  // ask to check this function
  async update(id: string, user: User): Promise<User> {
    const {
      // contacts,
      ...userData
    } = user;

    await this.usersRepository.save({ id, ...userData });
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

  // ask to check this function
  async createEdu(id: string): Promise<void> {
    const user = await this.findOne(id);
    // await this.contactsRepository.delete({ user: { id } });
    await this.usersRepository.remove(user);
  }
}
