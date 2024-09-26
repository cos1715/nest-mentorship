import {
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileSizeValidationPipe } from './file.pipe';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async generateCSV(@Res() res: Response) {
    const csvBuffer = await this.fileService.generateCSV();
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=educations.csv',
    });
    res.send(csvBuffer);
  }

  @Get('from-server')
  async getFromServer(@Res() res: Response) {
    const products = await this.fileService.getFromServer();
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename=products.json',
    });
    res.send(products);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileSizeValidationPipe({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.parseCSV(file.buffer);
  }
}
