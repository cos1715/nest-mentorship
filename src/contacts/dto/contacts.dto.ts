import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

interface IContactsDto {
  name: string;
  phone: string;
}

export class ContactsDto implements IContactsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsPhoneNumber('UA')
  @IsNotEmpty()
  phone: string;
}
