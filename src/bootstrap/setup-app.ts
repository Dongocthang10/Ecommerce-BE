import cookieParser from "cookie-parser";
import {NestExpressApplication} from "@nestjs/platform-express";
import {Logger} from 'nestjs-pino';
import {ValidationPipe, VersioningType} from '@nestjs/common';
import { APP_CONFIG } from "../config/app/app.config.js";
import { ConfigService } from "@nestjs/config";

export function setupApp (app: NestExpressApplication, logger: Logger, config: ConfigService) {
    app.use(cookieParser);
    const appCfg = config.getOrThrow<{corsOrigins: string[]}>(APP_CONFIG)
    const allowedOrigins = appCfg.corsOrigins;
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
      app.enableShutdownHooks();
}