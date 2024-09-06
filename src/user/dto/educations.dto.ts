import { IsNotEmpty, IsString } from 'class-validator';

interface IEducationDto {
  degree: string;
  facilityName: string;
}

export class EducationDto implements IEducationDto {
  @IsString()
  @IsNotEmpty()
  degree: string;
  @IsString()
  @IsNotEmpty()
  facilityName: string;
}
