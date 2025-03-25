import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from 'src/campaign/schemas/campaign.schema';
import { Character, CharacterSchema } from 'src/character/schemas/character.schema';
import { Group, GroupSchema } from 'src/group/schemas/group.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { SeederService } from './seeder.service';

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
