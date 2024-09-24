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
    .addBearerAuth()
    .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, documentBuilder);

  // Setup Swagger documentation at the /api-docs route
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'GiftCart API Documentation',
    customfavIcon:
      'https://res.cloudinary.com/sliceup/image/upload/v1727119778/products/app-logo.png',
    customCss: `
  /* General Layout */
  .swagger-ui {
    background-color: #f4f4f9;
    font-family: 'Roboto', sans-serif;
  }

  .topbar {
    background-color: #34495e;
    border-bottom: 5px solid #ff5a5f;
  }

  .topbar-wrapper h2 {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }

  /* Change the primary color for buttons and links */
  .swagger-ui .btn, 
  .swagger-ui .btn-primary {
    background-color: #ff5a5f;
    border-color: #ff5a5f;
  }

  .swagger-ui .btn:hover, 
  .swagger-ui .btn-primary:hover {
    background-color: #ff4044;
  }

  /* Customize the info section */
  .swagger-ui .info .title {
    color: #2c3e50;
    font-size: 30px;
    font-weight: 600;
  }

  .swagger-ui .info .description {
    color: #7f8c8d;
    font-size: 16px;
    margin-bottom: 20px;
  }

  /* Table Header */
  .swagger-ui table thead th {
    background-color: #34495e;
    color: #fff;
    font-weight: bold;
  }

  /* Endpoint Methods */
  .swagger-ui .opblock .opblock-summary-method {
    color: #fff;
    font-size: 14px;
    padding: 8px 12px;
  }

  .swagger-ui .opblock.opblock-get .opblock-summary-method {
    background-color: #3498db;
  }

  .swagger-ui .opblock.opblock-post .opblock-summary-method {
    background-color: #27ae60;
  }

  .swagger-ui .opblock.opblock-put .opblock-summary-method {
    background-color: #f39c12;
  }

  .swagger-ui .opblock.opblock-delete .opblock-summary-method {
    background-color: #e74c3c;
  }

  /* Change colors of the schema */
  .swagger-ui .model-box {
    background-color: #ecf0f1;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
  }

  /* Footer styling */
  .swagger-ui .version {
    color: #7f8c8d;
  }
`,
  });
}
