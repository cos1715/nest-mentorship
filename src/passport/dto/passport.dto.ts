import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

interface IPassportDto {
  code: string;
  issuedDate: string;
}

export class PassportDto implements IPassportDto {
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsDateString()
  @IsNotEmpty()
  issuedDate: string;
}
