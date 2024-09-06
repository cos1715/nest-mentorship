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
import { EducationDto } from './educations.dto';

interface ICreateUserDto {
  name: string;
  email: string;
  contacts: ContactDto[];
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
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts: ContactDto[];
  @ValidateNested()
  @Type(() => PassportDto)
  passport: PassportDto;
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];
}
