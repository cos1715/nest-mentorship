import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PassportDto } from '../../passport/dto';
import { EducationDto } from '../../education/dto';
import { ContactsDto } from '../../contacts/dto/contacts.dto';

interface IUserDto {
  name: string;
  email: string;
  contacts: ContactsDto[];
  passport: PassportDto;
  education: EducationDto[];
}

export class UserDto implements IUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['admin', 'user'])
  @IsOptional()
  role: string;

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
