import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { EducationModule } from '../education/education.module';

@Module({
  imports: [HttpModule, EducationModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
