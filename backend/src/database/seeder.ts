import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Campaign, CampaignDocument } from 'src/campaign/schemas/campaign.schema';
import { Group, GroupDocument } from 'src/group/schemas/group.schema';
import { Character, CharacterDocument } from 'src/character/schemas/character.schema';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

class Seeder {
  constructor(
    private userModel: Model<UserDocument>,
    private campaignModel: Model<CampaignDocument>,
    private groupModel: Model<GroupDocument>,
    private characterModel: Model<CharacterDocument>,
  ) {}

  getRandomObjects () {
    const filePath = path.join(__dirname, 'characters.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const shuffled = [...jsonData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, faker.number.int({min: 0, max: 6}));
  };

  async seed(
    userCount = faker.number.int({min: 4, max: 8}), 
    campaignsPerUser = faker.number.int({min: 0, max: 3}), 
    groupsMainPerCampaign = faker.number.int({min: 0, max: 6}),
    groupsPnjPerCampaign = faker.number.int({min: 0, max: 6}),
    groupsArchivedPerCampaign = faker.number.int({min: 0, max: 6})) {
    
    console.log('Starting database seeding...');

    await this.userModel.deleteMany({});
    await this.campaignModel.deleteMany({});
    await this.groupModel.deleteMany({});
    await this.characterModel.deleteMany({});

    for (let i = 0; i < userCount; i++) {
      const campaigns = [];

      for (let j = 0; j < campaignsPerUser; j++) {
        const mainGroups = [];
        const pnjGroups = [];
        const archivedGroups = [];

        for (let k = 0; k < groupsMainPerCampaign; k++) {
          const mainCharacters = await this.characterModel.create(this.getRandomObjects());

          const mainGroup = await this.groupModel.create({
            label: faker.company.name(),
            description: faker.lorem.paragraph({min: 0, max: 3}),
            active: faker.number.int({min: 0, max: 1}) === 1,
            characters: mainCharacters.map(c => c._id),
          });

          mainGroups.push(mainGroup._id);
        }

        for (let k = 0; k < groupsPnjPerCampaign; k++) {
          const pnjCharacters = await this.characterModel.create(this.getRandomObjects());

          const pnjGroup = await this.groupModel.create({
            label: faker.company.name(),
            description: faker.lorem.paragraph({min: 0, max: 3}),
            active: faker.number.int({min: 0, max: 1}) === 1,
            characters: pnjCharacters.map(c => c._id),
          });

          pnjGroups.push(pnjGroup._id);
        }
       
        for (let k = 0; k < groupsArchivedPerCampaign; k++) {
          const archivedCharacters = await this.characterModel.create(this.getRandomObjects());

          const archivedGroup = await this.groupModel.create({
            label: faker.company.name(),
            description: faker.lorem.paragraph({min: 0, max: 3}),
            active: faker.number.int({min: 0, max: 1}) === 1,
            characters: archivedCharacters.map(c => c._id),
          });

          archivedGroups.push(archivedGroup._id);
        }

        const campaign = await this.campaignModel.create({
            label: faker.lorem.words(3),
            description: faker.lorem.paragraph({min: 0, max: 3}),
            groups: {
                main: mainGroups,
                pnj: pnjGroups,
                archived: archivedGroups
            }
        });

        campaigns.push(campaign._id);
      }

      await this.userModel.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        campaigns,
      });
    }

    console.log('Database seeding completed!');
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const userModel = app.get<Model<UserDocument>>('UserModel');
  const campaignModel = app.get<Model<CampaignDocument>>('CampaignModel');
  const groupModel = app.get<Model<GroupDocument>>('GroupModel');
  const characterModel = app.get<Model<CharacterDocument>>('CharacterModel');

  const seeder = new Seeder(userModel, campaignModel, groupModel, characterModel);
  await seeder.seed();

  await app.close();
}

bootstrap();
