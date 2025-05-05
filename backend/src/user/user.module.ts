import { Module } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserController } from '@/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/schemas/user.schema';
import { CampaignModule } from '@/campaign/campaign.module';
import { Campaign, CampaignSchema } from '@/campaign/schemas/campaign.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Campaign.name, schema: CampaignSchema },
    ]),
    CampaignModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserService
  ],
})
export class UserModule {}
