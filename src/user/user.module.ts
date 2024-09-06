import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Contacts } from '../contacts/entity';
import { Passport } from '../passport/entity';
import { Education } from './entity/educations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contacts, Passport, Education])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
