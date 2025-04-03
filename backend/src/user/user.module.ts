import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CampaignModule } from '@/campaign/campaign.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    CampaignModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
