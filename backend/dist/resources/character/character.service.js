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
var CharacterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const character_schema_1 = require("./core/schemas/character.schema");
const mongoose_2 = require("mongoose");
const group_schema_1 = require("../group/schemas/group.schema");
let CharacterService = CharacterService_1 = class CharacterService {
    constructor(characterModel, groupModel) {
        this.characterModel = characterModel;
        this.groupModel = groupModel;
        this.SERVICE_NAME = CharacterService_1.name;
        this.logger = new common_1.Logger(this.SERVICE_NAME);
    }
    async validateResource(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            const message = `Error while fetching character ${id}: Id is not a valid mongoose id`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.BadRequestException(message);
        }
        const character = await this.characterModel.findById(id).exec();
        if (!character) {
            const message = `Character ${id} not found`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.NotFoundException(message);
        }
        if (character.deletedAt) {
            const message = `Character ${id} is gone`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.GoneException(message);
        }
    }
    async findAllByUser(userId, query, groupId) {
        try {
            let { name = '', page = 1, offset = 10 } = query;
            let sort = { updatedAt: 'asc' };
            if (query.sort) {
                query.sort.startsWith('-')
                    ? (sort[query.sort.substring(1)] = 'desc')
                    : (sort[query.sort] = 'asc');
            }
            const filters = {
                name: { $regex: `${decodeURIComponent(name)}`, $options: 'i' },
                deletedAt: { $eq: null },
                createdBy: new mongoose_2.Types.ObjectId(userId),
            };
            if (groupId) {
                filters['groups'] = { $in: [groupId] };
            }
            const start = Date.now();
            const characters = await this.characterModel
                .find(filters)
                .sort(sort)
                .limit(offset)
                .skip((page - 1) * offset);
            const nbCharacters = await this.characterModel.countDocuments(filters);
            const end = Date.now();
            let message = `Characters found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message: message,
                data: characters,
                pagination: {
                    page: page,
                    offset: offset,
                    total: nbCharacters,
                },
            };
        }
        catch (error) {
            const message = `Error while fetching characters: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async findOne(id) {
        try {
            await this.validateResource(id);
            const start = Date.now();
            const character = await this.characterModel
                .findById(id)
                .populate('groups')
                .exec();
            const end = Date.now();
            const message = `Character #${id} found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: character,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            const message = `Error while fetching character #${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async remove(id) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                const message = `Error while deleting character #${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const start = Date.now();
            const character = await this.characterModel.findById(id).exec();
            if (!character) {
                const message = `Character #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            if (character.deletedAt) {
                const message = `Character #${id} already deleted`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.GoneException(message);
            }
            character.deletedAt = new Date();
            character.groups.forEach(async (groupId) => {
                await this.groupModel
                    .updateOne({ _id: groupId }, { $pull: { characters: id } })
                    .exec();
            });
            await character.save();
            const end = Date.now();
            const message = `Character #${id} delete in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: character,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException) {
                throw error;
            }
            const message = `Error while deleting character #${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.CharacterService = CharacterService;
exports.CharacterService = CharacterService = CharacterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(character_schema_1.Character.name)),
    __param(1, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CharacterService);
//# sourceMappingURL=character.service.js.map