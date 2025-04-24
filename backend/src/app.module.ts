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
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MaillingService } from './mailling/mailling.service';
import { MaillingModule } from './mailling/mailling.module';


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
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.RECEIVER_EMAIL}>`,
      },
      template: {
        dir: join(process.cwd(), 'src/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MaillingModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, MaillingService],
})
export class AppModule {}
