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
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => configService.db,
      inject: [ConfigService],
    }),
    // is that ok?
    CaslModule,
    UserModule,
    ContactsModule,
    PassportModule,
    AuthModule,
    EducationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
