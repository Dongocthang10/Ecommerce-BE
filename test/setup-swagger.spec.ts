import { Test } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { setupSwagger } from '../src/bootstrap/setup-swagger.js';

describe('Swagger setup', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({}).compile();
    app = module.createNestApplication<NestExpressApplication>();
    app.setGlobalPrefix('api');
    setupSwagger(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('serves the Swagger UI and document under the global prefix', async () => {
    await request(app.getHttpServer()).get('/api/docs/').expect(200);
    await request(app.getHttpServer())
      .get('/api/docs-json')
      .expect(200)
      .expect(({ body }) => {
        expect(body.info.title).toBe('Ecommerce APIs');
      });
  });
});
