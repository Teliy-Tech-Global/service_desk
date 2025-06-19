import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (if frontend will access this API)
  app.enableCors();

  // Global ValidationPipe for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Service Desk API')
    .setDescription('API documentation for the Service Desk platform')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT auth in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Access docs at /api-docs

  // Start the application
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(
    `🚀 Service Desk API is running on http://localhost:${port}/api-docs`,
  );
}

bootstrap();
