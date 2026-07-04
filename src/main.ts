<<<<<<< HEAD
=======
import { ValidationPipe } from '@nestjs/common';
>>>>>>> a4d85ab1cdaff4624083aebd4fc9ffd7f23078dc
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
=======

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
>>>>>>> a4d85ab1cdaff4624083aebd4fc9ffd7f23078dc
