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
const response_service_1 = require("src/response/response.service");
const message_service_1 = require("src/errors/message.service");
let CampaignService = CampaignService_1 = class CampaignService {
    constructor(campaignModel) {
        this.campaignModel = campaignModel;
        this.logger = new common_1.Logger(CampaignService_1.name);
        this.SERVICE_NAME = CampaignService_1.name;
        this.errorsService = new message_service_1.MessageService();
        this.MONGOOSE_ERROR_ID = "external_mongoose_id_error";
        this.RESOURCE_NOT_FIND = "external_resource_not_find";
        this.RESOURCE_FIND = "external_resource_find";
        this.RESOURCE_NOT_FIND_LOG = "internal_resource_not_find";
        this.RESOURCE_FIND_LOG = "internal_resource_find";
    }
    create(createCampaignDto) {
        return 'This action adds a new campaign';
    }
    findAll() {
        return `This action returns all campaign`;
    }
    async findOne(id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                this.logger.error(this.errorsService.getErrorMessage(this.MONGOOSE_ERROR_ID, [id]), null, this.SERVICE_NAME);
                return response_service_1.ResponseService.sendResponse(this.errorsService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), {}, [response_service_1.ResponseService.setError("mongoose_id_not_valid", "critical")]);
            }
            const start = Date.now();
            const campaign = await this.campaignModel.findById(id)
                .populate({ path: 'groups.main', populate: { path: 'characters' } })
                .populate({ path: 'groups.pnj', populate: { path: 'characters' } })
                .populate({ path: 'groups.archived', populate: { path: 'characters' } })
                .exec();
            const end = Date.now();
            if (!campaign) {
                this.logger.error(this.errorsService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), null, this.SERVICE_NAME);
                return response_service_1.ResponseService.sendResponse(this.errorsService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), {}, [response_service_1.ResponseService.setError("invalid_campaign_id", "critical")]);
            }
            this.logger.verbose(this.errorsService.getErrorMessage(this.RESOURCE_FIND_LOG, ['Campagne', id, (end - start).toString()]), this.SERVICE_NAME);
            return response_service_1.ResponseService.sendResponse(this.errorsService.getErrorMessage(this.RESOURCE_FIND, ['la campagne', id]), campaign, []);
        }
        catch (error) {
            this.logger.error(this.errorsService.getErrorMessage(this.RESOURCE_NOT_FIND_LOG, ['la campagne', id, error.message]), null, this.SERVICE_NAME);
            return response_service_1.ResponseService.sendResponse(this.errorsService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), {}, [response_service_1.ResponseService.setError("internal_error", "critical")]);
        }
    }
    update(id, updateCampaignDto) {
        return `This action updates a #${id} campaign`;
    }
    remove(id) {
        return `This action removes a #${id} campaign`;
    }
};
exports.CampaignService = CampaignService;
exports.CampaignService = CampaignService = CampaignService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(campaign_schema_1.Campaign.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CampaignService);
//# sourceMappingURL=campaign.service.js.map