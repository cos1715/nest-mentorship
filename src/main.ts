import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // why this is not working?
  // app.enableCors({ origin: 'http://localhost:3000' });
  // ngrok use to create url

  app.use(compression({ threshold: 0 }));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
