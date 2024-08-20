import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'nest-mentorship',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      toRetry: () => false,
    }),
    UserModule,
  ],
})
export class AppModule {}
