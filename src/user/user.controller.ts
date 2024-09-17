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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateUserDto } from './dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { LocalAuthGuard } from 'src/auth/guards';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
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
