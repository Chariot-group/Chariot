import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from 'logger/winston.logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance
    })
  });
  await app.listen(process.env.API_PORT ?? 3000);

  console.log('Chariot API running on port:', process.env.API_PORT ?? 3000);
}
bootstrap();
