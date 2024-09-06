import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

interface IUpdateContactsDto {
  id: string;
  name: string;
  phone: string;
}

export class UpdateContactsDto implements IUpdateContactsDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  phone: string;
}
