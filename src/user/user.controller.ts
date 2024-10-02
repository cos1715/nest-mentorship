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
  UseGuards,
  Inject,
  // UseGuards,
} from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { UpdateUserDto, UserDto } from './dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import {
  AppAbility,
  CaslAbilityFactory,
  EAction,
} from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/decorators';
import { PoliciesGuard } from 'src/guards/authorization.guard';
// import { LocalAuthGuard } from '../guards';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
    private schedulerRegistry: SchedulerRegistry,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Cron('45 * * * * *', { name: 'notifications' })
  handleCron() {
    console.log('Called when the current second is 45');
  }

  @Interval(180000)
  handleInterval() {
    console.log('Called every 180 seconds');
    const job = this.schedulerRegistry.getCronJob('notifications');

    job.stop();
    console.log(job.lastDate());
  }

  // @UseGuards(LocalAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<User[]> {
    const user = req?.user as User;
    const ability = this.caslAbilityFactory.createForUser(user);
    const access = ability.can(EAction.Read, User);
    if (access) {
      const cachedData = await this.cacheManager.get<User[]>('findAll');
      if (cachedData) {
        return cachedData;
      }
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      const data = await this.userService.findAll();
      await this.cacheManager.set('findAll', data);
      return data;
    }
    throw new HttpException('Forbidden', 403);
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(EAction.Read, User))
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(EAction.Create, User))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(EAction.Update, User))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(EAction.Delete, User))
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
