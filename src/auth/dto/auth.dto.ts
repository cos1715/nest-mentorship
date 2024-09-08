import { IsNotEmpty, IsString } from 'class-validator';

interface IAuthDto {
  email: string;
  password: string;
}

export class AuthDto implements IAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
