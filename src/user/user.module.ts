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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Contacts, Passport, Education]),
    // is that ok?
    CaslModule,
    EducationModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
