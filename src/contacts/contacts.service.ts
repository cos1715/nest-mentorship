import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from './entity/contacts.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private contactsRepository: Repository<Contacts>,
  ) {}

  findUserContacts(id: string): Promise<Contacts[]> {
    return this.contactsRepository.find({ where: { userId: id } });
  }
}
