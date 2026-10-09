import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import {Logger} from 'nestjs-pino';
import { APP_CONFIG } from './config/app/app.config.js';
import { setupApp } from './bootstrap/setup-app.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './bootstrap/setup-swagger.js';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {bufferLogs: true});
  app.useLogger(app.get(Logger));

  const config = app.get(ConfigService);
  const appCfg = config.getOrThrow<{ port: number }>(APP_CONFIG);
  const logger = app.get(Logger);

  setupApp(app, logger, config)
  setupSwagger(app)

  const port = appCfg.port ?? 8080;
  await app.listen(config.get('PORT') ?? 8080);
  logger.log(`Server is running on port ${port}`);
  logger.log(`Swagger documentation is available at http://localhost:${port}/docs`)
}
await bootstrap().catch((error) => {
  console.error('Bootstrap failed', error);
  process.exit(1);
});
