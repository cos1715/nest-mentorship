import { IsDateString, IsNotEmpty, IsPassportNumber } from 'class-validator';

interface IPassportDto {
  code: string;
  issuedDate: string;
}

export class PassportDto implements IPassportDto {
  @IsPassportNumber('UA')
  @IsNotEmpty()
  code: string;
  @IsDateString()
  @IsNotEmpty()
  issuedDate: string;
}
