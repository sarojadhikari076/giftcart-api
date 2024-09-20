import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });

  const config = new DocumentBuilder()
    .setTitle('GiftCart API')
    .setDescription('API for GiftCart application')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 9000, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 9000}`,
    );
  });
}
bootstrap();
