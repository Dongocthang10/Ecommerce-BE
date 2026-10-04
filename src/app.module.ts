import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {validateEnv} from './config/env.validation.js';
import { PinoLoggerModule } from './config/logger/logger.module.js';

const envFile = process.env.NODE_ENV === 'production' 
? ['.env.prod', '.env'] : ['.env.dev', 'env']


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
      envFilePath: envFile
    }),
    PinoLoggerModule
  ],
})
export class AppModule {}
