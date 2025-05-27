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
var GroupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const group_schema_1 = require("./schemas/group.schema");
const mongoose_2 = require("mongoose");
const character_schema_1 = require("../character/schemas/character.schema");
const campaign_schema_1 = require("../campaign/schemas/campaign.schema");
let GroupService = GroupService_1 = class GroupService {
    constructor(groupModel, campaignModel, characterModel) {
        this.groupModel = groupModel;
        this.campaignModel = campaignModel;
        this.characterModel = characterModel;
        this.SERVICE_NAME = GroupService_1.name;
        this.logger = new common_1.Logger(this.SERVICE_NAME);
    }
    async create(createGroupDto) {
        try {
            const { characters = [], campaigns, ...groupData } = createGroupDto;
            const characterCheckPromises = characters.map((characterId) => this.characterModel.findById(characterId).exec());
            const characterCheckResults = await Promise.all(characterCheckPromises);
            const invalidCharacters = characterCheckResults.filter((character) => !character);
            if (invalidCharacters.length > 0) {
                const invalidCharacterIds = characters.filter((_, index) => !characterCheckResults[index]);
                const message = `Invalid characters IDs: ${invalidCharacterIds.join(', ')}`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const campaignCheckPromises = campaigns.map((campaign) => this.campaignModel.findById(campaign.idCampaign).exec());
            const campaignCheckResults = await Promise.all(campaignCheckPromises);
            const invalidCampaigns = campaignCheckResults.filter((campaign) => !campaign);
            if (invalidCampaigns.length > 0) {
                const invalidCampaignIds = campaigns.map((campaign) => campaign.idCampaign).filter((_, index) => !campaignCheckResults[index]);
                const message = `Invalid campaign IDs: ${invalidCampaignIds.join(', ')}`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const start = Date.now();
            const group = await this.groupModel.create({
                ...groupData,
                characters,
                campaigns: campaigns.map((campaign) => campaign.idCampaign),
            });
            await this.characterModel.updateMany({ _id: { $in: characters.map((id) => id) } }, { $addToSet: { groups: group._id } });
            campaigns.forEach(async (campaign) => {
                const type = campaign.type;
                const campaignId = campaign.idCampaign;
                await this.campaignModel.updateMany({ _id: campaignId }, { $addToSet: { [`groups.${type}`]: group._id } });
            });
            const end = Date.now();
            const message = `Group created in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: group,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            const errorMessage = `Error while creating group: ${error.message}`;
            this.logger.error(errorMessage);
            throw new common_1.InternalServerErrorException(errorMessage);
        }
    }
    async findAll(query, campaignId) {
        try {
            const { label = '', page = 1, offset = 10, sort = 'updatedAt' } = query;
            let sortCriteria = { updatedAt: 'asc' };
            if (query.sort) {
                query.sort.startsWith('-')
                    ? (sortCriteria[query.sort.substring(1)] = 'desc')
                    : (sortCriteria[query.sort] = 'asc');
            }
            const filters = {
                label: { $regex: `${label}`, $options: 'i' },
                deletedAt: { $eq: null },
            };
            if (campaignId) {
                filters['campaigns'] = { $in: [campaignId] };
            }
            const start = Date.now();
            const groups = await this.groupModel
                .find(filters)
                .sort(sortCriteria)
                .limit(offset)
                .skip((page - 1) * offset);
            const totalItems = await this.groupModel.countDocuments(filters);
            const end = Date.now();
            const message = `Groups found in ${end - start}ms`;
            this.logger.verbose(message);
            return {
                message: message,
                data: groups,
                pagination: {
                    page: page,
                    offset: offset,
                    total: totalItems,
                },
            };
        }
        catch (error) {
            const errorMessage = `Error while fetching groups: ${error.message}`;
            this.logger.error(errorMessage);
            throw new common_1.InternalServerErrorException(errorMessage);
        }
    }
    async findOne(id) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                const message = `Error while fetching group ${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const start = Date.now();
            const group = await this.groupModel
                .findById(id)
                .populate('characters')
                .populate('campaigns')
                .exec();
            const end = Date.now();
            if (!group) {
                const message = `Group ${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            if (group.deletedAt) {
                const message = `Group ${id} is gone`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.GoneException(message);
            }
            const message = `Group found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: group,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            const message = `Error while fetching group ${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async update(id, updateGroupDto) {
        try {
            let { characters, campaigns, ...groupData } = updateGroupDto;
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                const message = `Error while updating group #${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            let group = await this.groupModel.findById(id).populate('campaigns').exec();
            if (!group) {
                const message = `Group #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            if (group.deletedAt) {
                const message = `Group #${id} already deleted`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.GoneException(message);
            }
            if (characters) {
                const invalidIds = [];
                characters.forEach((character) => {
                    if (!mongoose_2.Types.ObjectId.isValid(character)) {
                        invalidIds.push(character);
                    }
                });
                if (invalidIds.length > 0) {
                    const message = `These are not valid mongoose Ids: ${invalidIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.BadRequestException(message);
                }
                const characterCheckPromises = characters.map((characterId) => this.characterModel.findById(characterId).exec());
                const characterCheckResults = await Promise.all(characterCheckPromises);
                const invalidCharacters = characterCheckResults.filter((character) => !character);
                if (invalidCharacters.length > 0) {
                    const invalidCharacterIds = characters.filter((_, index) => !characterCheckResults[index]);
                    const message = `Invalid characters IDs: ${invalidCharacterIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.NotFoundException(message);
                }
                const deletedCharacters = characterCheckResults.filter((character) => character.deletedAt);
                if (deletedCharacters.length > 0) {
                    const deletedCharacterIds = characters.filter((_, index) => characterCheckResults[index].deletedAt);
                    const message = `These characters are already deleted: ${deletedCharacterIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.GoneException(message);
                }
            }
            else {
                characters = group.characters.map((character) => character._id.toString());
            }
            let campaignIds = [];
            if (campaigns) {
                const invalidIds = [];
                campaigns.forEach((campaign) => {
                    if (!mongoose_2.Types.ObjectId.isValid(campaign.idCampaign)) {
                        invalidIds.push(campaign.idCampaign);
                    }
                });
                if (invalidIds.length > 0) {
                    const message = `These are not valid mongoose Ids: ${invalidIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.BadRequestException(message);
                }
                const campaignCheckPromises = campaigns.map((campaign) => this.campaignModel.findById(campaign.idCampaign).exec());
                const campaignCheckResults = await Promise.all(campaignCheckPromises);
                const invalidCampaigns = campaignCheckResults.filter((campaign) => !campaign);
                if (invalidCampaigns.length > 0) {
                    const invalidCampaignIds = campaigns.map((campaign) => campaign.idCampaign).filter((_, index) => !campaignCheckResults[index]);
                    const message = `Invalid campaign IDs: ${invalidCampaignIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.NotFoundException(message);
                }
                const deletedCampaigns = campaignCheckResults.filter((campaign) => campaign.deletedAt);
                if (deletedCampaigns.length > 0) {
                    const deletedCampaignIds = campaigns.filter((_, index) => campaignCheckResults[index].deletedAt).map((campaign) => campaign.idCampaign);
                    const message = `These campaigns are already deleted: ${deletedCampaignIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.GoneException(message);
                }
                campaignIds = campaigns.map((campaign) => campaign.idCampaign);
            }
            else {
                campaignIds = group.campaigns.map((campaign) => campaign._id.toString());
            }
            const charactersToRemove = group.characters.filter((oldCharacter) => !characters.some((newCharacters) => newCharacters === oldCharacter._id.toString()));
            const start = Date.now();
            const groupUpdate = await this.groupModel
                .updateOne({ _id: id }, {
                ...groupData,
                characters,
                campaigns: campaignIds,
            })
                .exec();
            group = await this.groupModel.findById(id).populate('campaigns').populate('characters').exec();
            await this.characterModel.updateMany({ _id: { $in: characters.map((id) => id) } }, { $addToSet: { groups: id } });
            await this.characterModel.updateMany({ _id: { $in: charactersToRemove } }, { $pull: { groups: id } });
            if (campaigns) {
                campaigns.forEach(async (newCampaign) => {
                    ["main", "npc", "archived"].forEach(async (type) => {
                        const campaignId = newCampaign.idCampaign;
                        await this.campaignModel.updateMany({ _id: campaignId }, { $pull: { [`groups.${type}`]: id } });
                    });
                });
                campaigns.forEach(async (campaign) => {
                    const type = campaign.type;
                    const campaignId = campaign.idCampaign;
                    await this.campaignModel.updateMany({ _id: campaignId }, { $addToSet: { [`groups.${type}`]: id } });
                });
            }
            const end = Date.now();
            if (groupUpdate.modifiedCount === 0) {
                const message = `Group #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            const message = `Group update in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: group,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            const message = `Error while updating group: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async remove(id) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                const message = `Error while deleting group #${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const group = await this.groupModel.findById(id).exec();
            if (!group) {
                const message = `Error while deleting group #${id}: Group not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            if (group.deletedAt) {
                const message = `Error while deleting group #${id}: Group already deleted`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.GoneException(message);
            }
            const start = Date.now();
            group.deletedAt = new Date();
            const updated = await this.characterModel
                .updateMany({ _id: { $in: group.characters } }, { $pull: { groups: id } })
                .exec();
            group.characters = [];
            group.save();
            const end = Date.now();
            const message = `Group delete in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: group,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException) {
                throw error;
            }
            const message = `Error while deleting group #${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = GroupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __param(1, (0, mongoose_1.InjectModel)(campaign_schema_1.Campaign.name)),
    __param(2, (0, mongoose_1.InjectModel)(character_schema_1.Character.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GroupService);
//# sourceMappingURL=group.service.js.map