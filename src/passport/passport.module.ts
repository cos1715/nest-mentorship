import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportController } from './passport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passport } from './entity';
import { User } from 'src/user/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passport, User])],
  providers: [PassportService],
  controllers: [PassportController],
  exports: [PassportService],
})
export class PassportModule {}
