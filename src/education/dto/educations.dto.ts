import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

interface IEducationDto {
  degree: string;
  facilityName: string;
}

export enum EDegree {
  Bachelors = 'Bachelors',
  Masters = 'Masters',
  PhD = 'PhD',
}

export class EducationDto implements IEducationDto {
  @IsEnum(EDegree)
  @IsNotEmpty()
  degree: string;
  @IsString()
  @IsNotEmpty()
  facilityName: string;
}
