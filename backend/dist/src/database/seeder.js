"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const faker_1 = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");
class Seeder {
    constructor(userModel, campaignModel, groupModel, characterModel) {
        this.userModel = userModel;
        this.campaignModel = campaignModel;
        this.groupModel = groupModel;
        this.characterModel = characterModel;
    }
    getRandomObjects() {
        const filePath = path.join(__dirname, 'characters.json');
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const shuffled = [...jsonData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, faker_1.faker.number.int({ min: 0, max: 6 }));
    }
    ;
    async seed(userCount = faker_1.faker.number.int({ min: 4, max: 8 }), campaignsPerUser = faker_1.faker.number.int({ min: 0, max: 3 }), groupsMainPerCampaign = faker_1.faker.number.int({ min: 0, max: 6 }), groupsPnjPerCampaign = faker_1.faker.number.int({ min: 0, max: 6 }), groupsArchivedPerCampaign = faker_1.faker.number.int({ min: 0, max: 6 })) {
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
                        label: faker_1.faker.company.name(),
                        description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                        active: faker_1.faker.number.int({ min: 0, max: 1 }) === 1,
                        characters: mainCharacters.map(c => c._id),
                    });
                    mainGroups.push(mainGroup._id);
                }
                for (let k = 0; k < groupsPnjPerCampaign; k++) {
                    const pnjCharacters = await this.characterModel.create(this.getRandomObjects());
                    const pnjGroup = await this.groupModel.create({
                        label: faker_1.faker.company.name(),
                        description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                        active: faker_1.faker.number.int({ min: 0, max: 1 }) === 1,
                        characters: pnjCharacters.map(c => c._id),
                    });
                    pnjGroups.push(pnjGroup._id);
                }
                for (let k = 0; k < groupsArchivedPerCampaign; k++) {
                    const archivedCharacters = await this.characterModel.create(this.getRandomObjects());
                    const archivedGroup = await this.groupModel.create({
                        label: faker_1.faker.company.name(),
                        description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                        active: faker_1.faker.number.int({ min: 0, max: 1 }) === 1,
                        characters: archivedCharacters.map(c => c._id),
                    });
                    archivedGroups.push(archivedGroup._id);
                }
                const campaign = await this.campaignModel.create({
                    label: faker_1.faker.lorem.words(3),
                    description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                    groups: {
                        main: mainGroups,
                        pnj: pnjGroups,
                        archived: archivedGroups
                    }
                });
                campaigns.push(campaign._id);
            }
            await this.userModel.create({
                name: faker_1.faker.person.fullName(),
                email: faker_1.faker.internet.email(),
                password: faker_1.faker.internet.password(),
                campaigns,
            });
        }
        console.log('Database seeding completed!');
    }
}
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get('UserModel');
    const campaignModel = app.get('CampaignModel');
    const groupModel = app.get('GroupModel');
    const characterModel = app.get('CharacterModel');
    const seeder = new Seeder(userModel, campaignModel, groupModel, characterModel);
    await seeder.seed();
    await app.close();
}
bootstrap();
//# sourceMappingURL=seeder.js.map