import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { setupSwagger } from './setup.swagger';

dotenv.config();

/**
 * Initializes and starts the NestJS application.
 *
 * This function performs the following tasks:
 * - Creates a NestJS application instance with CORS and raw body parsing enabled.
 * - Sets up Swagger documentation using Redoc.
 * - Enables a global validation pipe with specific options.
 * - Configures CORS settings to allow requests from `http://localhost:3000` with specific headers and methods.
 * - Starts the application on the specified port (default is 9000) and logs the server URL.
 *
 * @async
 * @function bootstrap
 * @returns {Promise<void>} A promise that resolves when the application has started.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });

  // Swagger configuration
  await setupSwagger(app);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Add CORS headers for all requests and from all origins
  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    credentials: true,
    exposedHeaders: 'Set-Cookie',
    maxAge: 3600,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });

  // Start the application and log the URL
  await app.listen(process.env.PORT || 9000, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 9000}`,
    );
  });
}

bootstrap();
