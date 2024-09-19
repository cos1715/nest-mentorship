import { ContactsDto } from '../../contacts/dto';
import { EducationDto } from '../../education/dto';
import { PassportDto } from '../../passport/dto';

export enum EUserRole {
  Admin = 'admin',
  User = 'user',
}

export interface IUserDto {
  name: string;
  email: string;
  contacts: ContactsDto[];
  passport: PassportDto;
  education: EducationDto[];
  password: string;
  role: EUserRole;
}
