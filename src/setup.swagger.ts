import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Sets up Swagger API documentation for the NestJS application.
 * This function configures and serves Swagger documentation for the GiftCart API,
 * which includes endpoints for managing products, orders, coupons, and user interactions.
 *
 * @param {INestApplication} app - The NestJS application instance.
 * @returns {Promise<void>} - A promise that resolves when Swagger documentation is set up.
 */
export async function setupSwagger(app: INestApplication): Promise<void> {
  // Swagger configuration
  const documentBuilder = new DocumentBuilder()
    .setTitle('GiftCart API')
    .setDescription(
      'API for managing GiftCart application operations, including products, orders, coupons, and user interactions.',
    )
    .setVersion('0.1')
    .addBearerAuth(
      {
        description: `Please enter token in the following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, documentBuilder);

  // Setup Swagger documentation at the /api-docs route
  SwaggerModule.setup('api-docs', app, document);
}
