import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

interface ICreateUserDto {
  name: string;
  email: string;
}

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
}
