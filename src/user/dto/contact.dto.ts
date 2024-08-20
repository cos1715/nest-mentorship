import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

interface IContactDto {
  code: string;
  issuedDate: string;
}

export class ContactDto implements IContactDto {
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsDateString()
  @IsNotEmpty()
  issuedDate: string;
}
