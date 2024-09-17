import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { Education } from './entity';
import { EducationDto } from './dto';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  findAll(): Promise<Education[]> {
    return this.educationService.findAll();
  }

  @Get('search')
  findByQuery(
    @Query('filter') filter: string,
    @Query('query') query: string,
  ): Promise<Education[]> {
    return this.educationService.findByQuery(filter, query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Education> {
    return this.educationService.findById(id);
  }

  @Post()
  create(@Body() body: EducationDto): Promise<Education> {
    return this.educationService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: EducationDto,
  ): Promise<Education> {
    return this.educationService.updateById(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<Education> {
    return this.educationService.delete(id);
  }
}
