import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Contacts } from '../contacts/entity';
import { Passport } from '../passport/entity';
import { Education } from '../education/entity';
import { EducationModule } from '../education/education.module';
import { CaslModule } from 'src/casl/casl.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({}),
    TypeOrmModule.forFeature([User, Contacts, Passport, Education]),
    CaslModule,
    EducationModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
