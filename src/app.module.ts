import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ContactsModule } from './contacts/contacts.module';
import { PassportModule } from './passport/passport.module';
import { AuthModule } from './auth/auth.module';
import { EducationModule } from './education/education.module';
import { JwtAuthGuard } from './guards';
import { FileModule } from './file/file.module';

// https://docs.nestjs.com/techniques/task-scheduling

// redis, pulumi or terraform, sqs

@Module({
  imports: [
    ConfigModule,
    // why didn't work?
    // CacheModule.register({
    //   isGlobal: true,
    // }),
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
