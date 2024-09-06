import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PassportService } from './passport.service';
import { Passport } from './entity';

@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Get(':id')
  findPassport(@Param('id', ParseUUIDPipe) id: string): Promise<Passport> {
    return this.passportService.findPassport(id);
  }
}
