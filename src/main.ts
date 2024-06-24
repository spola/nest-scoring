import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Lidz Scoring')
    .setDescription('Api related to the scoring calculation of clients')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
