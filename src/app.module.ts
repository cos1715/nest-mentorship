import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ContactsModule } from './contacts/contacts.module';
import { PassportModule } from './passport/passport.module';
import { AuthModule } from './auth/auth.module';
import { EducationModule } from './education/education.module';
import { JwtAuthGuard } from './guards';
import { FileModule } from './file/file.module';

// deploy app on azure

@Module({
  imports: [
    ConfigModule,
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      ttl: 100000,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => configService.db,
      inject: [ConfigService],
    }),
    UserModule,
    ContactsModule,
    PassportModule,
    AuthModule,
    EducationModule,
    FileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
