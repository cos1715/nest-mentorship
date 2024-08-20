import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContactDto } from './contact.dto';
import { PassportDto } from './passport.dto';

interface ICreateUserDto {
  name: string;
  email: string;
  contacts: ContactDto[];
}

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts: ContactDto[];
  @ValidateNested()
  @Type(() => PassportDto)
  passport: PassportDto;
}
