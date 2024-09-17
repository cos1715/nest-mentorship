import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

interface IEducationDto {
  degree: string;
  facilityName: string;
}

export class EducationDto implements IEducationDto {
  @IsEnum(['Bachelors', 'Masters', 'PhD'])
  @IsNotEmpty()
  degree: string;
  @IsString()
  @IsNotEmpty()
  facilityName: string;
}
