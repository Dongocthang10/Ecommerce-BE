import { registerAs } from "@nestjs/config";

export const DATABASE_CONFIG = 'database';

export default registerAs(DATABASE_CONFIG, () => ({
        type: 'postgres',
        host: process.env.DB_HOST ?? 'localhost',
        ort: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'abc123',
        name: process.env.DB_NAME ?? 'postgres',
        extra: {
                max: parseInt(process.env.DB_POOL_MAX ?? '10', 10),
                min: parseInt(process.env.DB_POOL_MIN ?? '2', 10),
                connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT_MS ?? '5000', 10),
                idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT_MS ?? '30000', 10)
        }
}));

// DB_HOST=localhost
// DB_PORT=5432
// DB_USERNAME=postgres
// DB_PASSWORD=abc123
// DB_NAME=ecommerce
// DB_SYNCHRONIZE=false

