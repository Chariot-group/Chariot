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
var NpcService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const group_schema_1 = require("../../group/schemas/group.schema");
const character_schema_1 = require("../core/schemas/character.schema");
let NpcService = NpcService_1 = class NpcService {
    constructor(characterModel, groupModel) {
        this.characterModel = characterModel;
        this.groupModel = groupModel;
        this.SERVICE_NAME = NpcService_1.name;
        this.logger = new common_1.Logger(this.SERVICE_NAME);
    }
    async validateGroupRelations(groupIds) {
        if (!groupIds || groupIds.length === 0)
            return;
        for (const groupId of groupIds) {
            if (!mongoose_1.Types.ObjectId.isValid(groupId)) {
                throw new common_1.BadRequestException(`Invalid group ID: #${groupId}`);
            }
            const group = await this.groupModel.findById(groupId).exec();
            if (!group) {
                throw new common_1.NotFoundException(`Group not found: #${groupId}`);
            }
            if (group.deletedAt) {
                throw new common_1.GoneException(`Group already deleted: #${groupId}`);
            }
        }
    }
    async validateResource(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            const message = `Error while fetching character #${id}: Id is not a valid mongoose id`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.BadRequestException(message);
        }
        const npc = await this.characterModel.findById(id).exec();
        if (!npc) {
            const message = `NPC #${id} not found`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.NotFoundException(message);
        }
        if (npc.deletedAt) {
            const message = `NPC #${id} is gone`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.GoneException(message);
        }
    }
    async create(createNpcDto, userId) {
        try {
            if (createNpcDto.groups) {
                for (const groupId of createNpcDto.groups) {
                    if (!mongoose_1.Types.ObjectId.isValid(groupId)) {
                        throw new common_1.BadRequestException(`Invalid group ID format: ${groupId}`);
                    }
                }
                await this.validateGroupRelations(createNpcDto.groups);
            }
            const start = Date.now();
            const newNpc = new this.characterModel.discriminators['npc']({
                ...createNpcDto,
                createdBy: new mongoose_1.Types.ObjectId(userId),
            });
            const savedNpc = await newNpc.save();
            await this.groupModel.updateMany({
                _id: {
                    $in: createNpcDto.groups && createNpcDto.groups.map((id) => id),
                },
            }, { $addToSet: { characters: savedNpc._id } });
            const end = Date.now();
            const message = `NPC created in ${end - start}ms`;
            return {
                message,
                data: savedNpc,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException) {
                throw error;
            }
            let message = `Error creating NPC: ${error.message}`;
            this.logger.error(message);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async update(id, updateNpcDto) {
        try {
            let { groups, ...npcData } = updateNpcDto;
            await this.validateResource(id);
            let npc = await this.characterModel.findById(id).exec();
            if (groups) {
                const groupCheckPromises = groups.map((groupId) => this.groupModel.findById(groupId).exec());
                const groupCheckResults = await Promise.all(groupCheckPromises);
                const invalidGroups = groupCheckResults.filter((group) => !group);
                if (invalidGroups.length > 0) {
                    const invalidNpcIds = groups.filter((_, index) => !groupCheckResults[index]);
                    const message = `Invalid group IDs: ${invalidNpcIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.BadRequestException(message);
                }
                const goneGroups = groupCheckResults.filter((group) => group.deletedAt);
                if (goneGroups.length > 0) {
                    const goneGroupIds = goneGroups.map((group) => group._id.toString());
                    const message = `Gone group IDs: ${goneGroupIds.join(', ')}`;
                    this.logger.error(message, null, this.SERVICE_NAME);
                    throw new common_1.GoneException(message);
                }
            }
            else {
                groups = npc.groups.map((group) => group._id.toString());
            }
            const groupsToRemove = npc.groups.filter((oldGroups) => !groups.some((newGroups) => newGroups === oldGroups._id.toString()));
            const start = Date.now();
            const npcUpdate = await this.characterModel.discriminators['npc']
                .updateOne({ _id: id }, {
                ...npcData,
                groups,
            })
                .exec();
            npc = await this.characterModel.findById(id).populate('groups').exec();
            await this.groupModel.updateMany({ _id: { $in: groups.map((id) => id) } }, { $addToSet: { characters: id } });
            await this.groupModel.updateMany({ _id: { $in: groupsToRemove } }, { $pull: { characters: id } });
            const end = Date.now();
            if (npcUpdate.modifiedCount === 0) {
                const message = `NPC #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            const message = `NPC #${id} update in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: npc,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            const message = `Error while updating #${id} NPC: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.NpcService = NpcService;
exports.NpcService = NpcService = NpcService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(character_schema_1.Character.name)),
    __param(1, (0, mongoose_2.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], NpcService);
//# sourceMappingURL=npc.service.js.map