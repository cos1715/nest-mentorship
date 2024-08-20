import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Contact } from './entity/contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
