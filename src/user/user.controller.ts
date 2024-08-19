import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseFilters,
  ParseUUIDPipe,
  UseInterceptors,
  ParseArrayPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { HttpExceptionFilter } from './http-exception.filter';
import { CreateUserDto } from './user.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
// why passing classes is better than passing class instance?
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Post('/bulk')
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    users: CreateUserDto[],
  ): Promise<User[]> {
    return this.userService.createBulk(users);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: User,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
