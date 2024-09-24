import { FileValidator, Injectable } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe extends FileValidator {
  private readonly maxSize: number;
  readonly name = 'FileSizeValidationPipe';

  constructor(options: { maxSize: number; validationOptions?: any }) {
    super(options.validationOptions);
    this.maxSize = options.maxSize;
  }

  isValid(file: Express.Multer.File): boolean {
    return file.size < this.maxSize;
  }

  buildErrorMessage(): string {
    return `File size should not exceed ${this.maxSize} bytes`;
  }
}
