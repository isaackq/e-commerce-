import { registerAs } from '@nestjs/config';
import { seconds } from '@nestjs/throttler';

export default registerAs('throttle', () => ({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  ttl: process.env.THROTTLE_TTL || seconds(60), // time to live in seconds
  limit: process.env.THROTTLE_LIMIT || 50,
}));
