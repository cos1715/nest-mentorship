import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PassportDto } from '../../passport/dto';
import { EducationDto } from './educations.dto';
import { ContactsDto } from 'src/contacts/dto/contacts.dto';

interface ICreateUserDto {
  name: string;
  email: string;
  contacts: ContactsDto[];
  passport: PassportDto;
  education: EducationDto[];
}

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @ValidateNested({ each: true })
  @Type(() => ContactsDto)
  contacts: ContactsDto[];
  @ValidateNested()
  @Type(() => PassportDto)
  passport: PassportDto;
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];
}
