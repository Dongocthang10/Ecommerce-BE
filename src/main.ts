import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import {parseEnvOrigins} from './utils/parse-env-origins.js';
import {ValidationPipe} from '@nestjs/common';
import {VersioningType} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const getCorsAllowedList = (config: ConfigService) => {
  return parseEnvOrigins(
    config.get<string>('CLIENT_URL')
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = app.get(ConfigService);

  const allowedOrigins = getCorsAllowedList(config);
  app.enableCors({
    origin: (requestOrigin: string, callback: any) => {
      if(!requestOrigin) {
        callback(null, true);
        return;
      }

      if(allowedOrigins.includes(requestOrigin)) {
        callback(null, true);
        return;
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept'
    ],
    credentials: true
  })

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    forbidNonWhitelisted: true
  }))

  // API versioning

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  }
  )
  await app.listen(config.get('PORT') ?? 8080);
}
await bootstrap();
