import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface IConfigService {
  db: TypeOrmModuleOptions;
}

@Injectable()
export class ConfigService implements IConfigService {
  db: TypeOrmModuleOptions;
  constructor(private configService: NestConfigService) {
    this.db = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: 'nest-mentorship',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      toRetry: () => false,
      logging: true,
    };
  }
}
