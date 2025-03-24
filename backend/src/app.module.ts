import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { GroupModule } from './group/group.module';
import { CampaignModule } from './campaign/campaign.module';
import { SeederModule } from './seeder/seeder.module';
import { ResponseService } from './response/response.service';
import { ErrorsService } from './errors/message.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables du env dans tous les modules
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    CharacterModule,
    GroupModule,
    CampaignModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, ResponseService, ErrorsService],
})
export class AppModule {}
