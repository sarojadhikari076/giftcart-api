import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('GiftCart API')
    .setDescription(
      'API for managing GiftCart application operations, including products, orders, coupons, and user interactions.',
    )
    .setVersion('0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addTag('Products', 'Endpoints related to product management')
    .addTag('Orders', 'Endpoints for order processing and management')
    .addTag('Coupons', 'Endpoints for managing discount coupons')
    .addTag('Users', 'Endpoints for user account and authentication management')
    .build();

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Create Swagger document and set up the Swagger UI
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application and log the URL
  await app.listen(process.env.PORT || 9000, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 9000}`,
    );
  });
}

bootstrap();
