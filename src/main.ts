import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from '@common';
import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';

// TODO Настроить подключение через HTTPS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONTEND'),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  await app.listen(configService.get<string>('PORT') ?? 4200, () => {
    console.log(
      `Start server with port ${configService.get<string>('PORT') ?? 4200}`,
    );
  });
}
bootstrap();
