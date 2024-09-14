import { Module } from '@nestjs/common';
import { EducationService } from './education.service';

@Module({
  providers: [EducationService]
})
export class EducationModule {}
