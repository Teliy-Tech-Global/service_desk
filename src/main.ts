// import 'dotenv/config';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as session from 'express-session';
// import * as passport from 'passport';
// import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const config = app.get(ConfigService);

//   // Configure express-session
//   app.use(
//     session({
//       secret: config.get<string>('SESSION_SECRET') || 'fallback-secret',
//       resave: false,
//       saveUninitialized: false,
//     }),
//   );

//   // Initialize passport
//   app.use(passport.initialize());
//   app.use(passport.session());

//   // Start the server
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Service Desk API')
    .setDescription('API documentation for the Service Desk project')
    .setVersion('1.0')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
