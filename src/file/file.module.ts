import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { EducationModule } from '../education/education.module';

@Module({
  imports: [EducationModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
