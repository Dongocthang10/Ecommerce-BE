import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import {parseEnvOrigins} from './utils/parse-env-origins.js';
import {ValidationPipe} from '@nestjs/common';
import {VersioningType} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Logger} from 'nestjs-pino';

const getCorsAllowedList = (config: ConfigService) => {
  return parseEnvOrigins(
    config.get<string>('CLIENT_URL')
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  const config = app.get(ConfigService);
  const logger = app.get(Logger);

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

      logger.warn(`CORS request from origin ${requestOrigin} is not allowed`);
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
  const port = config.get('PORT') ?? 8080;
  await app.listen(config.get('PORT') ?? 8080);
  logger.log(`Server is running on port ${port}`);
}
await bootstrap();
