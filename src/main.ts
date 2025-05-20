import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Service Desk API')
    .setDescription('API documentation for the Service Desk project')
    .setVersion('1.0')
    .addBearerAuth() // if you're using JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}

bootstrap();
