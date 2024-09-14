import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from './entity';
import { ContactsDto, UpdateContactsDto } from './dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private contactsRepository: Repository<Contacts>,
  ) {}

  findContacts(id: string): Promise<Contacts[]> {
    return this.contactsRepository.findBy({ userId: id });
  }

  async createContact(id: string, data: ContactsDto): Promise<Contacts[]> {
    const contacts = this.contactsRepository.create({
      userId: id,
      ...data,
    });
    await this.contactsRepository.save(contacts);
    return this.findContacts(id);
  }

  async updateContact(
    userId: string,
    data: UpdateContactsDto,
  ): Promise<Contacts> {
    const contact = await this.contactsRepository.findOne({
      where: { id: data.id },
    });
    if (userId === contact.userId) {
      const newContact: Contacts = { ...contact, ...data };
      await this.contactsRepository.update(data.id, newContact);
      return newContact;
    } else {
      throw new HttpException('Unauthorized', 403);
    }
  }

  async deleteContact(userId: string, data: UpdateContactsDto): Promise<void> {
    const contact = await this.contactsRepository.findOne({
      where: { id: data.id },
    });
    if (userId === contact.userId) {
      await this.contactsRepository.delete(data.id);
    } else {
      throw new HttpException('Unauthorized', 403);
    }
  }
}
