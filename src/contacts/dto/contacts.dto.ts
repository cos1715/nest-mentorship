import { IsNotEmpty, IsString } from 'class-validator';

interface IContactsDto {
  name: string;
  phone: string;
}

export class ContactsDto implements IContactsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
}
