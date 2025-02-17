import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables du env dans tous les modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
