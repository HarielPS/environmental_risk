import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita campos extra
      forbidNonWhitelisted: true, // error si mandan campos no permitidos
      transform: true, // transforma tipos con class-transformer
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
