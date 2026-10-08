import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'abc123',
  database: process.env.DB_NAME ?? 'ecommerce-db',

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],

  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: true,
});