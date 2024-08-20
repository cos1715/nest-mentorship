import { IsNotEmpty, IsString } from 'class-validator';

interface IContactDto {
  name: string;
  number: string;
}

export class ContactDto implements IContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  number: string;
}
