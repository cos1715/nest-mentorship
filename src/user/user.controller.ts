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
  Request,
  HttpException,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { UpdateUserDto, UserDto } from './dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { CaslAbilityFactory, EAction } from 'src/casl/casl-ability.factory';
// import { LocalAuthGuard } from '../guards';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Get()
  findAll(@Request() req): Promise<User[]> {
    const user = req?.user as User;
    const ability = this.caslAbilityFactory.createForUser(user);
    const access = ability.can(EAction.Read, User);
    if (access) {
      return this.userService.findAll();
    }
    throw new HttpException('Forbidden', 403);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Post('/bulk')
  createBulk(
    @Body(new ParseArrayPipe({ items: UserDto }))
    users: UserDto[],
  ): Promise<User[]> {
    return this.userService.createBulk(users);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
