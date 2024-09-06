import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Contact } from './entity/contacts.entity';
import { Passport } from './entity/passport.entity';
import { Education } from './entity/educations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact, Passport, Education])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
