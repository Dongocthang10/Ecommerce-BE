import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { IncomingMessage } from 'http';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isDev = configService.get('NODE_ENV') === 'development';
        return {
          pinoHttp: {
            level: isDev ? 'debug' : 'info',
            transport: isDev
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                  },
                }
              : undefined,

            genReqId: (req, res) => {
                const existing = req.headers['x-request-id']
                const id = existing ?? crypto.randomUUID();
                // req.headers['x-request-id'] = id;
                res.setHeader('x-request-id', id);

                return id;
            } ,
            redact: {
              paths: [
                'req.headers.authorization',
                'res.headers.cookies',
                'req.body.password',
                'req.headers.["set-cookie"]',
              ],
              censor: '[REDATED]'
            },
            customProps: (req: IncomingMessage) => ({
                userId: (req as IncomingMessage & { user?: {id: string}}).user?.id,

            })
          },
        };
      },
    }),
  ],
  exports: [LoggerModule],
})
export class PinoLoggerModule {}
