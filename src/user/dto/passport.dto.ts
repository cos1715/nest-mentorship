import { IsNotEmpty, IsString } from 'class-validator';

interface IPassportDto {
  name: string;
  number: string;
}

export class PassportDto implements IPassportDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  number: string;
}
