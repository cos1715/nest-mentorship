import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ContactsModule } from './contacts/contacts.module';
import { PassportModule } from './passport/passport.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => configService.db,
      inject: [ConfigService],
    }),
    UserModule,
    ContactsModule,
    PassportModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
