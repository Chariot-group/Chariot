"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs = require("fs");
const path = require("path");
const campaign_schema_1 = require("../resources/campaign/schemas/campaign.schema");
const group_schema_1 = require("../resources/group/schemas/group.schema");
const user_schema_1 = require("../resources/user/schemas/user.schema");
require("reflect-metadata");
const bcrypt = require("bcrypt");
const character_schema_1 = require("../resources/character/core/schemas/character.schema");
let SeederService = class SeederService {
    constructor(userModel, campaignModel, groupModel, characterModel) {
        this.userModel = userModel;
        this.campaignModel = campaignModel;
        this.groupModel = groupModel;
        this.characterModel = characterModel;
        this.SERVICE_NAME = this.constructor.name;
    }
    getRandomObjects() {
        const filePath = path.join(__dirname, 'runner', 'characters-new.json');
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const shuffled = [...jsonData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, faker_1.faker.number.int({ min: 0, max: shuffled.length }));
    }
    async seed(clean) {
        if (clean) {
            common_1.Logger.log('Cleaning database...', this.SERVICE_NAME);
            await this.userModel.deleteMany({});
            await this.campaignModel.deleteMany({});
            await this.groupModel.deleteMany({});
            await this.characterModel.deleteMany({});
            common_1.Logger.log('Database cleaned', this.SERVICE_NAME);
        }
        const userCount = faker_1.faker.number.int({ min: 4, max: 8 });
        for (let i = 0; i < userCount; i++) {
            let hashPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, 10);
            await this.userModel.create({
                username: faker_1.faker.person.fullName(),
                email: faker_1.faker.internet.email(),
                password: hashPassword,
            });
            const users = await this.userModel.find();
            const campaigns = [];
            const campaignsPerUser = faker_1.faker.number.int({ min: 0, max: 3 });
            for (let j = 0; j < campaignsPerUser; j++) {
                const mainGroups = [];
                const npcGroups = [];
                const archivedGroups = [];
                const groupsMainPerCampaign = faker_1.faker.number.int({
                    min: 0,
                    max: 6,
                });
                const groupsNpcPerCampaign = faker_1.faker.number.int({
                    min: 0,
                    max: 6,
                });
                const groupsArchivedPerCampaign = faker_1.faker.number.int({
                    min: 0,
                    max: 6,
                });
                for (let k = 0; k < groupsMainPerCampaign; k++) {
                    const mainCharacters = await this.characterModel.create(this.getRandomObjects().map((character) => ({
                        ...character,
                        createdBy: users[i]._id,
                    })));
                    const mainGroup = await this.groupModel.create({
                        label: faker_1.faker.company.name(),
                        description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                        active: faker_1.faker.number.int({ min: 0, max: 1 }) === 1,
                        characters: mainCharacters.map((c) => c._id),
                        createdBy: users[i]._id,
                    });
                    mainCharacters.forEach((c) => {
                        c.groups.push(mainGroup.id);
                        c.createdBy = mainGroup.createdBy;
                        c.save();
                    });
                    mainGroups.push(mainGroup._id);
                }
                for (let k = 0; k < groupsNpcPerCampaign; k++) {
                    const npcCharacters = await this.characterModel.create(this.getRandomObjects().map((character) => ({
                        ...character,
                        createdBy: users[i]._id,
                    })));
                    const npcGroup = await this.groupModel.create({
                        label: faker_1.faker.company.name(),
                        description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                        active: faker_1.faker.number.int({ min: 0, max: 1 }) === 1,
                        characters: npcCharacters.map((c) => c._id),
                        createdBy: users[i]._id,
                    });
                    npcCharacters.forEach((c) => {
                        c.groups.push(npcGroup.id);
                        c.createdBy = npcGroup.createdBy;
                        c.save();
                    });
                    npcGroups.push(npcGroup._id);
                }
                for (let k = 0; k < groupsArchivedPerCampaign; k++) {
                    const archivedCharacters = await this.characterModel.create(this.getRandomObjects().map((character) => ({
                        ...character,
                        createdBy: users[i]._id,
                    })));
                    const archivedGroup = await this.groupModel.create({
                        label: faker_1.faker.company.name(),
                        description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                        active: faker_1.faker.number.int({ min: 0, max: 1 }) === 1,
                        characters: archivedCharacters.map((c) => c._id),
                        createdBy: users[i]._id,
                    });
                    archivedCharacters.forEach((c) => {
                        c.groups.push(archivedGroup.id);
                        c.createdBy = archivedGroup.createdBy;
                        c.save();
                    });
                    archivedGroups.push(archivedGroup._id);
                }
                const campaign = await this.campaignModel.create({
                    label: faker_1.faker.lorem.words(3),
                    description: faker_1.faker.lorem.paragraph({ min: 0, max: 3 }),
                    groups: {
                        main: mainGroups,
                        npc: npcGroups,
                        archived: archivedGroups,
                    },
                    users: [users[i]._id],
                    createdBy: users[i]._id,
                });
                await this.userModel.updateMany({ _id: users[i]._id }, { $addToSet: { campaigns: campaign._id } });
                await this.groupModel.updateMany({ _id: { $in: mainGroups.map((id) => id) } }, { $addToSet: { campaigns: campaign._id } });
                await this.groupModel.updateMany({ _id: { $in: npcGroups.map((id) => id) } }, { $addToSet: { campaigns: campaign._id } });
                await this.groupModel.updateMany({ _id: { $in: archivedGroups.map((id) => id) } }, { $addToSet: { campaigns: campaign._id } });
                campaigns.push(campaign._id);
            }
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(campaign_schema_1.Campaign.name)),
    __param(2, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __param(3, (0, mongoose_1.InjectModel)(character_schema_1.Character.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SeederService);
//# sourceMappingURL=seeder.service.js.map