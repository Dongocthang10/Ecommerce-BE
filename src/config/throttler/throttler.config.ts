import {registerAs} from '@nestjs/config';

export const throttlerConfig = 'throttler';

export default registerAs(throttlerConfig, () => ({
  ttl: parseInt(process.env.THROTTLER_TTL_MS ?? '1000', 10),
  limit: parseInt(process.env.THROTTLER_LIMIT ?? '10', 10)
}));