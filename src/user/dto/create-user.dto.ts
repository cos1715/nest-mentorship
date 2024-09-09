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
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
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
