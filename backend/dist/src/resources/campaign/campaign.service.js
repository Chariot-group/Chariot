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
var CampaignService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const campaign_schema_1 = require("./schemas/campaign.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const group_schema_1 = require("../group/schemas/group.schema");
let CampaignService = CampaignService_1 = class CampaignService {
    constructor(campaignModel, groupModel) {
        this.campaignModel = campaignModel;
        this.groupModel = groupModel;
        this.logger = new common_1.Logger(CampaignService_1.name);
        this.SERVICE_NAME = CampaignService_1.name;
    }
    async validateGroupRelations(groupIds, type) {
        if (!groupIds || groupIds.length === 0)
            return;
        for (const groupId of groupIds) {
            if (!mongoose_1.Types.ObjectId.isValid(groupId)) {
                throw new common_1.BadRequestException(`Invalid ${type} group ID: ${groupId}`);
            }
            const group = await this.groupModel.findById(groupId).exec();
            if (!group) {
                throw new common_1.NotFoundException(`${type} group not found: ${groupId}`);
            }
            if (group.deletedAt) {
                throw new common_1.GoneException(`${type} group deleted: ${groupId}`);
            }
        }
    }
    async validateResource(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            const message = `Error while fetching campaign #${id}: Id is not a valid mongoose id`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.BadRequestException(message);
        }
        const campaign = await this.campaignModel.findById(id).exec();
        if (!campaign) {
            const message = `Campaign #${id} not found`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.NotFoundException(message);
        }
        if (campaign.deletedAt) {
            const message = `Campaign #${id} is gone`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.GoneException(message);
        }
    }
    async create(createCampaignDto, userId) {
        try {
            const { groups, ...campaignData } = createCampaignDto;
            const totalGroups = groups.main.concat(groups.npc, groups.archived);
            await this.validateGroupRelations(createCampaignDto.groups.main, 'Main');
            await this.validateGroupRelations(createCampaignDto.groups.npc, 'NPC');
            await this.validateGroupRelations(createCampaignDto.groups.archived, 'Archived');
            const start = Date.now();
            const campaign = await this.campaignModel.create({
                ...campaignData,
                groups,
                createdBy: new mongoose_1.Types.ObjectId(userId),
            });
            await this.groupModel.updateMany({ _id: { $in: totalGroups.map((id) => id) } }, { $addToSet: { campaigns: campaign._id } });
            const end = Date.now();
            const message = `Campaign created in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: campaign,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            const message = `Error while creating campaign: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async findAllByUser(userId, query) {
        try {
            const { page = 1, offset = 10, label = '' } = query;
            const skip = (page - 1) * offset;
            const filters = {
                label: { $regex: `${decodeURIComponent(label)}`, $options: 'i' },
                deletedAt: { $eq: null },
                createdBy: new mongoose_1.Types.ObjectId(userId),
            };
            const sort = { updatedAt: -1 };
            if (query.sort) {
                query.sort.startsWith('-')
                    ? (sort[query.sort.substring(1)] = -1)
                    : (sort[query.sort] = 1);
            }
            const totalItems = await this.campaignModel.countDocuments(filters);
            const start = Date.now();
            const campaigns = await this.campaignModel
                .find(filters)
                .skip(skip)
                .limit(offset)
                .sort(sort)
                .populate({
                path: 'groups.main',
                match: { deletedAt: null },
                select: '_id',
            })
                .populate({
                path: 'groups.npc',
                match: { deletedAt: null },
                select: '_id',
            })
                .populate({
                path: 'groups.archived',
                match: { deletedAt: null },
                select: '_id',
            })
                .exec();
            const end = Date.now();
            let campaignsWithGroupsClean = campaigns.map(doc => ({
                ...doc.toObject(),
                groups: {
                    main: doc.groups.main.map(group => group._id),
                    npc: doc.groups.npc.map(group => group._id),
                    archived: doc.groups.archived.map(group => group._id),
                },
            }));
            const message = `Campaigns found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: campaignsWithGroupsClean,
                pagination: {
                    page,
                    offset,
                    totalItems,
                },
            };
        }
        catch (error) {
            const message = `Error while fetching campaigns: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async findOne(id) {
        try {
            await this.validateResource(id);
            const start = Date.now();
            const campaign = await this.campaignModel
                .findById(id)
                .populate({ path: 'groups.main', populate: { path: 'characters' } })
                .populate({ path: 'groups.npc', populate: { path: 'characters' } })
                .populate({ path: 'groups.archived', populate: { path: 'characters' } })
                .exec();
            const end = Date.now();
            const message = `Campaign #${id} found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: campaign,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            const message = `Error while fetching campaign #${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async update(id, updateCampaignDto) {
        try {
            await this.validateResource(id);
            if (updateCampaignDto.groups) {
                await this.validateGroupRelations(updateCampaignDto.groups.main, 'Main');
                await this.validateGroupRelations(updateCampaignDto.groups.npc, 'NPC');
                await this.validateGroupRelations(updateCampaignDto.groups.archived, 'Archived');
            }
            const start = Date.now();
            const existingCampaign = await this.campaignModel.findById(id);
            if (updateCampaignDto.label &&
                updateCampaignDto.label !== existingCampaign.label) {
                const message = `Campaign label cannot be modified`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            if (updateCampaignDto.groups) {
                const { main = [], npc = [], archived = [] } = updateCampaignDto.groups;
                const newGroupIds = [...main, ...npc, ...archived];
                const currentGroupIds = [
                    ...existingCampaign.groups.main,
                    ...existingCampaign.groups.npc,
                    ...existingCampaign.groups.archived,
                ].map((id) => id.toString());
                const groupsToRemove = currentGroupIds.filter((id) => !newGroupIds.includes(id));
                if (groupsToRemove.length > 0) {
                    await this.groupModel.updateMany({ _id: { $in: groupsToRemove } }, { $pull: { campaigns: id } });
                }
                const groupsToAdd = newGroupIds.filter((id) => !currentGroupIds.includes(id));
                if (groupsToAdd.length > 0) {
                    await this.groupModel.updateMany({ _id: { $in: groupsToAdd } }, { $addToSet: { campaigns: id } });
                }
            }
            const updatedCampaign = await this.campaignModel
                .findByIdAndUpdate(id, {
                ...updateCampaignDto,
                updatedAt: new Date(),
            }, { new: true })
                .populate([
                { path: 'groups.main', populate: { path: 'characters' } },
                { path: 'groups.npc', populate: { path: 'characters' } },
                { path: 'groups.archived', populate: { path: 'characters' } },
            ]);
            const end = Date.now();
            const message = `Campaign #${id} updated in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message: message,
                data: updatedCampaign,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException) {
                throw error;
            }
            const message = `Error updating campaign #${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async remove(id) {
        try {
            await this.validateResource(id);
            const start = Date.now();
            const campaign = await this.campaignModel.findById(id).exec();
            campaign.deletedAt = new Date();
            campaign.groups.main.forEach(async (groupId) => {
                await this.groupModel
                    .updateOne({ _id: groupId }, { $pull: { campaign: id } })
                    .exec();
            });
            campaign.groups.main = [];
            campaign.groups.npc = [];
            campaign.groups.archived = [];
            await campaign.save();
            const end = Date.now();
            const message = `Campaign #${id} delete in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: campaign,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException) {
                throw error;
            }
            const message = `Error while deleting campaign #${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.CampaignService = CampaignService;
exports.CampaignService = CampaignService = CampaignService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(campaign_schema_1.Campaign.name)),
    __param(1, (0, mongoose_2.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], CampaignService);
//# sourceMappingURL=campaign.service.js.map