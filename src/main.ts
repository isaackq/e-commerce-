import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('e commerce app API') // عنوان الواجهة
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      //الاسم والرابط
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3000', 'Local development server') //يعني الطلبات بتنبعت على هادا السيرفر
    .addServer('https://api.myapp.com') // Production
    .setVersion('1.0')
    .addTag('eco')
    .addBearerAuth()
    .build();
  //Instantiate Document
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // app.getHttpAdapter().getInstance().set('trustproxy', true); //without it when the app in the cloud , the ip for all useers will be the same because the broxy , with this it can trrust the proxy and forward the user ip

  app.set('trust proxy', 'loopback');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // whitelist: true يعني اي قيمة جديدة مش موجودة في الدي تي او مش رح تصل الكونترولر
      forbidNonWhitelisted: true, //forbidNonWhitelisted: true :thrwos error when sent addtional feld in the request that does not is the dto// لو مش موجودة القيمة ممكن تصل عن طريق req.body
      transform: true, //transfer the incoming request to an instance of The DTO Class
      transformOptions: {
        //بصير يحول القيمة تلقائي حسب الموجود داخل  ال دي تي او يعني ببطل لازم نعمل تايب ترانسفورمر
        enableImplicitConversion: true,
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
