import { IsDateString, IsOptional, IsString } from 'class-validator';

interface IUpdatePassportDto {
  code: string;
  issuedDate: string;
}

export class UpdatePassportDto implements IUpdatePassportDto {
  @IsString()
  @IsOptional()
  code: string;
  @IsDateString()
  @IsOptional()
  issuedDate: string;
}
