import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './infrastructure/modules/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, DiscoveryService } from '@nestjs/core';
import { TokenGuard } from '@infrastructure/guard/token.guard';
import jwtConfig from '@infrastructure/config/jwt.config';
import { CartModule } from '@infrastructure/modules/cart.module';
import { ProductModule } from '@infrastructure/modules/product.module';
import { FavoritesModule } from '@infrastructure/modules/favorites.module';
import { ProductCategoryModule } from '@infrastructure/modules/product-category.module';
import { RepositoryLocator } from '@infrastructure/locators/repository.locator';
import { PaginationProvider } from '@infrastructure/providers/pagination.provider';
import throttleConfig from '@infrastructure/config/throttle.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { MongooseConnection } from '@infrastructure/consts/constant';
import { TaxClassModule } from '@infrastructure/modules/tax-class.module';
import { TaxRateModule } from '@infrastructure/modules/tax-rate.module';

const ENV = process.env.NODE_ENV;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [jwtConfig, throttleConfig],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/eco'),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          // the only reason for multiple throttles that we can override and spesify one by using @Throttle() they are working in prrallel so we cant get penfit of them like to run throttles after eachother
          {
            name: 'default', //its the defualt name even if we not assign it
            ttl: configService.get<number>('throttle.ttl'),
            limit: configService.get<number>('throttle.limit'),
            // blockDuration: seconds(15), // unblock the ip after 1 second // if we dont set the block duration it will be tha same as ttl , block duration must be more than the ttl
          },
          // {
          //   name: 'short', //make sure not to exeed these throttles
          //   ttl: seconds(10),
          //   limit: 3,
          // },
          // {
          //   name: 'medium',
          //   ttl: seconds(30),
          //   limit: 10,
          // },
          // {
          //   name: 'long',
          //   ttl: seconds(80),
          //   limit: 25,
          // },
        ],
        errorMessage: 'Wow! Slow down!',
        storage: new ThrottlerStorageRedisService(configService.get<string>('throttle.url')),
        // getTracker: (req: Record<string, any>) => {//used to bloke or limit access pased on what we want to , like user id , ip etc.....
        //   const userIdFromAuth = req.user?.id || req.user?.userId;
        //   const userIdFromHeader = req.headers['x-user-id'];
        //   return (userIdFromAuth || userIdFromHeader || req.ip) as string;
        // },
        // generateKey: (_ctx: ExecutionContext, tracker: string) => {//generate a new formate to store the key
        //   return tracker;
        // },
      }),
    }),
    UserModule,
    ProductModule,
    ProductCategoryModule,
    CartModule,
    FavoritesModule,
    TaxClassModule,
    TaxRateModule,
  ],
  controllers: [],
  providers: [
    DiscoveryService,
    { provide: APP_GUARD, useClass: TokenGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    RepositoryLocator,
    PaginationProvider,
  ],
  exports: [RepositoryLocator, PaginationProvider],
})
export class AppModule {}
