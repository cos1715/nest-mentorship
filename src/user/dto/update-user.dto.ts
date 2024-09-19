import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PassportDto } from '../../passport/dto';
import { EducationDto } from '../../education/dto';
import { ContactsDto } from '../../contacts/dto/contacts.dto';
import { IUserDto, EUserRole } from './types';

export class UpdateUserDto implements IUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEnum(EUserRole)
  @IsOptional()
  role: EUserRole;

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
