import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {validateEnv} from './config/env.validation.js';
import { PinoLoggerModule } from './config/logger/logger.module.js';
import { AppThrottlerModule } from './config/throttler/throttler.module.js';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CorrelationMiddleware } from './core/middlewares/correlation-id.middleware.js';
import { AllExceptionFilter } from './core/filters/all-exception.filter.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cfgLoad } from './config/configuration.js';
import { TypeOrmConfigService } from './config/database/typeorm-config.service.js';
const envFile = process.env.NODE_ENV === 'production' 
? ['.env.prod', '.env'] : ['.env.dev', 'env']


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
      envFilePath: envFile,
      load: cfgLoad
    }),
    PinoLoggerModule,
    AppThrottlerModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
