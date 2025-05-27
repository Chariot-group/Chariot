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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const campaign_schema_1 = require("../campaign/schemas/campaign.schema");
let UserService = UserService_1 = class UserService {
    constructor(userModel, campaignModel) {
        this.userModel = userModel;
        this.campaignModel = campaignModel;
        this.SERVICE_NAME = UserService_1.name;
        this.logger = new common_1.Logger(this.SERVICE_NAME);
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    async findAll(query) {
        try {
            const { page = 1, offset = 10, email = '' } = query;
            const skip = (page - 1) * offset;
            const filter = {
                email: { $regex: `${email}`, $options: 'i' },
                deletedAt: { $eq: null },
            };
            const sort = { updatedAt: 1 };
            if (query.sort) {
                query.sort.startsWith('-')
                    ? (sort[query.sort.substring(1)] = -1)
                    : (sort[query.sort] = 1);
            }
            const totalItems = await this.userModel.countDocuments(filter);
            const start = Date.now();
            const users = await this.userModel
                .find(filter)
                .skip(skip)
                .limit(offset)
                .sort(sort)
                .exec();
            const end = Date.now();
            const message = `Users found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: users,
                pagination: {
                    page,
                    offset,
                    totalItems,
                },
            };
        }
        catch (error) {
            const message = `Error while fetching users: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async findOne(id) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                const message = `Error while fetching campaign ${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const start = Date.now();
            const user = await this.userModel.findById(id).exec();
            const end = Date.now();
            if (!user) {
                const message = `User ${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            if (user.deletedAt) {
                const message = `User ${id} is gone`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.GoneException(message);
            }
            const message = `User found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: user,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            const message = `Error while getting user: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async findByEmail(email) {
        try {
            const start = Date.now();
            const user = await this.userModel.findOne({ email: email }).exec();
            const end = Date.now();
            if (!user) {
                const message = `User ${email} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                return null;
            }
            if (user.deletedAt) {
                const message = `User ${email} is gone`;
                this.logger.error(message, null, this.SERVICE_NAME);
                return null;
            }
            const message = `User found in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return user;
        }
        catch (error) {
            const message = `Error while getting user: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            return null;
        }
    }
    async update(id, updateUserDto) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                const message = `Error while updating user #${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            let user = await this.userModel.findById(id);
            if (!user) {
                const message = `User #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            if (user.deletedAt) {
                const message = `User #${id} deleted`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.GoneException(message);
            }
            const { campaigns } = updateUserDto;
            const campaignsCheckPromises = campaigns.map((campaignId) => this.campaignModel.findById(campaignId).exec());
            const campaignsCheckResults = await Promise.all(campaignsCheckPromises);
            const invalidCampaigns = campaignsCheckResults.filter((campaign) => !campaign);
            if (invalidCampaigns.length > 0) {
                const invalidCampainIds = campaigns.filter((_, index) => !campaignsCheckResults[index]);
                const message = `Invalid campaigns IDs: ${invalidCampainIds.join(', ')}`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const start = Date.now();
            const userUpdate = await this.userModel
                .updateOne({ _id: id }, updateUserDto)
                .exec();
            user = await this.userModel.findById(id).populate('campaigns').exec();
            const end = Date.now();
            if (!user || userUpdate.modifiedCount === 0) {
                const message = `User #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            const message = `User update in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: user,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            const message = `Error while updating user: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async remove(id) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                const message = `Error while deleting user #${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const start = Date.now();
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                const message = `User #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            if (user.deletedAt) {
                const message = `User #${id} already deleted`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.GoneException(message);
            }
            user.deletedAt = new Date();
            await user.save();
            const end = Date.now();
            const message = `User delete in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: user,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException) {
                throw error;
            }
            const message = `Error while deleting character ${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(campaign_schema_1.Campaign.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map