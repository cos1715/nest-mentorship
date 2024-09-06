import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contacts } from './entity/contacts.entity';
import { ContactsDto, UpdateContactsDto } from './dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':id')
  findContacts(@Param('id', ParseUUIDPipe) id: string): Promise<Contacts[]> {
    return this.contactsService.findContacts(id);
  }

  @Post(':id')
  createContact(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() contact: ContactsDto,
  ): Promise<Contacts[]> {
    return this.contactsService.createContact(id, contact);
  }

  @Put(':id')
  updateContact(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() contact: UpdateContactsDto,
  ): Promise<Contacts> {
    return this.contactsService.updateContact(userId, contact);
  }

  @Delete(':id')
  deleteContact(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() contact: UpdateContactsDto,
  ): Promise<void> {
    return this.contactsService.deleteContact(userId, contact);
  }
}
