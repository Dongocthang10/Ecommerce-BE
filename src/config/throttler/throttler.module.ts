import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from './throttler.config.js';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const cfg = configService.getOrThrow<{ ttl: number; limit: number }>(
          throttlerConfig,
        );
        return {
          throttlers: [
            {
              name: 'default',
              ttl: cfg.ttl,
              limit: cfg.limit,
            },
          ],
        };
      },
    }),
  ],
  exports: [ThrottlerModule],
})
export class AppThrottlerModule {}
