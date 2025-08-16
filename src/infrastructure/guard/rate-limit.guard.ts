// import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import Redis from 'ioredis';

// @Injectable()
// export class LoginRateLimitGuard implements CanActivate {
//   private redis = new Redis('redis://localhost:6379');

//   private WINDOW_SEC = 5 * 60; // نافذة العدّ (مثلاً 5 دقائق)
//   private TIERS = [
//     { limit: 10, blockSec: 1 * 50 }, // 10 ⇒ ساعتين
//     { limit: 5, blockSec: 1 * 20 }, // 5  ⇒ 30 دقيقة
//   ];

//   async canActivate(ctx: ExecutionContext): Promise<boolean> {
//     const req = ctx.switchToHttp().getRequest();
//     const id = req.user?.id || req.headers['x-user-id'] || req.ip;

//     const attemptsKey = `login:attempts:${id}`;
//     const blockKey = `login:block:${id}`;

//     const blockTtl = await this.redis.ttl(blockKey);
//     if (blockTtl > 0) {
//       throw new BadRequestException(`Blocked ~${Math.ceil(blockTtl / 60)} min`);
//     }

//     const attempts = await this.redis.incr(attemptsKey);
//     if (attempts === 1) await this.redis.expire(attemptsKey, this.WINDOW_SEC);

//     for (const tier of this.TIERS) {
//       if (attempts >= tier.limit) {
//         await this.redis.set(blockKey, '1', 'EX', tier.blockSec);
//         const mins = Math.round(tier.blockSec / 60);
//         throw new BadRequestException(`Too many attempts. Blocked for ${mins} min.`);
//       }
//     }

//     return true;
//   }
// }
