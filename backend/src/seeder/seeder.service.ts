import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Campaign, CampaignDocument } from '@/campaign/schemas/campaign.schema';
import {
  Character,
  CharacterDocument,
} from '@/character/schemas/character.schema';
import { Group, GroupDocument } from '@/group/schemas/group.schema';
import { User, UserDocument } from '@/user/schemas/user.schema';
import 'reflect-metadata';
@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  getRandomObjects() {
    const filePath = path.join(__dirname, 'runner', 'characters.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const shuffled = [...jsonData].sort(() => 0.5 - Math.random());
    return shuffled.slice(
      0,
      faker.number.int({ min: 0, max: shuffled.length }),
    );
  }

  readonly SERVICE_NAME: string = this.constructor.name;

  async seed(clean: boolean) {
    if (clean) {
      Logger.log('Cleaning database...', this.SERVICE_NAME);
      await this.userModel.deleteMany({});
      await this.campaignModel.deleteMany({});
      await this.groupModel.deleteMany({});
      await this.characterModel.deleteMany({});
      Logger.log('Database cleaned', this.SERVICE_NAME);
    }

    const userCount = faker.number.int({ min: 4, max: 8 });

    for (let i = 0; i < userCount; i++) {
      const campaigns = [];

      const campaignsPerUser: number = faker.number.int({ min: 0, max: 3 });

      for (let j = 0; j < campaignsPerUser; j++) {
        const mainGroups = [];
        const npcGroups = [];
        const archivedGroups = [];

        const groupsMainPerCampaign: number = faker.number.int({
          min: 0,
          max: 6,
        });
        const groupsNpcPerCampaign: number = faker.number.int({
          min: 0,
          max: 6,
        });
        const groupsArchivedPerCampaign: number = faker.number.int({
          min: 0,
          max: 6,
        });

        for (let k = 0; k < groupsMainPerCampaign; k++) {
          const mainCharacters = await this.characterModel.create(
            this.getRandomObjects(),
          );

          const mainGroup = await this.groupModel.create({
            label: faker.company.name(),
            description: faker.lorem.paragraph({ min: 0, max: 3 }),
            active: faker.number.int({ min: 0, max: 1 }) === 1,
            characters: mainCharacters.map((c) => c._id),
          });

          mainCharacters.forEach((c: CharacterDocument) => {
            c.groups.push(mainGroup.id);
            c.save();
          });

          mainGroups.push(mainGroup._id);
        }

        for (let k = 0; k < groupsNpcPerCampaign; k++) {
          const npcCharacters = await this.characterModel.create(
            this.getRandomObjects(),
          );

          const npcGroup = await this.groupModel.create({
            label: faker.company.name(),
            description: faker.lorem.paragraph({ min: 0, max: 3 }),
            active: faker.number.int({ min: 0, max: 1 }) === 1,
            characters: npcCharacters.map((c) => c._id),
          });

          npcCharacters.forEach((c: CharacterDocument) => {
            c.groups.push(npcGroup.id);
            c.save();
          });

          npcGroups.push(npcGroup._id);
        }

        for (let k = 0; k < groupsArchivedPerCampaign; k++) {
          const archivedCharacters = await this.characterModel.create(
            this.getRandomObjects(),
          );

          const archivedGroup = await this.groupModel.create({
            label: faker.company.name(),
            description: faker.lorem.paragraph({ min: 0, max: 3 }),
            active: faker.number.int({ min: 0, max: 1 }) === 1,
            characters: archivedCharacters.map((c) => c._id),
          });

          archivedCharacters.forEach((c: CharacterDocument) => {
            c.groups.push(archivedGroup.id);
            c.save();
          });

          archivedGroups.push(archivedGroup._id);
        }

        const campaign = await this.campaignModel.create({
          label: faker.lorem.words(3),
          description: faker.lorem.paragraph({ min: 0, max: 3 }),
          groups: {
            main: mainGroups,
            npc: npcGroups,
            archived: archivedGroups,
          },
        });

        mainGroups.forEach(async (g: ObjectId) => {
          await this.groupModel.updateOne(
            { _id: g },
            { $addToSet: { campaigns: campaign._id } },
          );
        });

        npcGroups.forEach(async (g: ObjectId) => {
          await this.groupModel.updateOne(
            { _id: g },
            { $addToSet: { campaigns: campaign._id } },
          );
        });

        archivedGroups.forEach(async (g: ObjectId) => {
          await this.groupModel.updateOne(
            { _id: g },
            { $addToSet: { campaigns: campaign._id } },
          );
        });

        campaigns.push(campaign._id);
      }

      await this.userModel.create({
        username: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        campaigns: campaigns,
      });
    }
  }
}
