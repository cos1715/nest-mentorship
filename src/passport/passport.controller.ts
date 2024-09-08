import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PassportService } from './passport.service';
import { Passport } from './entity';
import { PassportDto, UpdatePassportDto } from './dto';

@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Get(':id')
  findPassport(@Param('id', ParseUUIDPipe) id: string): Promise<Passport> {
    return this.passportService.findPassport(id);
  }
  @Post(':id')
  createPassport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: PassportDto,
  ): Promise<Passport> {
    return this.passportService.createPassport(id, data);
  }
  @Put(':id')
  updatePassport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePassportDto,
  ): Promise<Passport> {
    return this.passportService.updatePassport(id, data);
  }
}
