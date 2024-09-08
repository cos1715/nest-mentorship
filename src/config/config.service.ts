import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface IConfigService {
  db: TypeOrmModuleOptions;
  jwtSecret: string;
}

@Injectable()
export class ConfigService implements IConfigService {
  db: TypeOrmModuleOptions;
  jwtSecret: string;
  constructor(private configService: NestConfigService) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.db = {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [path.join(__dirname, '..', '**', '*.entity{.ts,.js}')],
      synchronize: true,
      toRetry: () => false,
      logging: true,
    };
  }
}
