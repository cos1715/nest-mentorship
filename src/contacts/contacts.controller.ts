import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contacts } from './entity/contacts.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Contacts[]> {
    return this.contactsService.findUserContacts(id);
  }
}
