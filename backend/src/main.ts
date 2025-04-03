import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from '@/../logger/winston.logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  if (process.env.ENV === 'dev') {
    app.enableCors({
      origin: `${process.env.FRONTEND_URL}`,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(9000);

  console.log('Chariot API running on port:', process.env.API_PORT ?? 3000);
}
bootstrap();
