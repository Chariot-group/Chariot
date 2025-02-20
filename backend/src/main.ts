import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT ?? 3000);

  console.log('Chariot API running on port:', process.env.API_PORT ?? 3000);
}
bootstrap();
