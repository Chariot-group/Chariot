import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from '@/campaign/schemas/campaign.schema';
import { Character, CharacterSchema } from '@/character/schemas/character.schema';
import { Group, GroupSchema } from '@/group/schemas/group.schema';
import { User, UserSchema } from '@/user/schemas/user.schema';
import { SeederService } from '@/seeder/seeder.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Campaign.name, schema: CampaignSchema},
            {name: Character.name, schema: CharacterSchema},
            {name: Group.name, schema: GroupSchema},
            {name: User.name, schema: UserSchema}
        ])
    ],
    providers: [SeederService],
    exports: [SeederService]
})
export class SeederModule {}
