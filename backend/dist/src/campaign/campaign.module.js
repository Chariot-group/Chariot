"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModule = void 0;
const common_1 = require("@nestjs/common");
const campaign_service_1 = require("./campaign.service");
const campaign_controller_1 = require("./campaign.controller");
const mongoose_1 = require("@nestjs/mongoose");
const campaign_schema_1 = require("./schemas/campaign.schema");
const winston_1 = require("winston");
const groups_schema_1 = require("./schemas/sub/groups.schema");
const group_module_1 = require("../group/group.module");
const group_schema_1 = require("../group/schemas/group.schema");
let CampaignModule = class CampaignModule {
};
exports.CampaignModule = CampaignModule;
exports.CampaignModule = CampaignModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: campaign_schema_1.Campaign.name, schema: campaign_schema_1.CampaignSchema },
                { name: groups_schema_1.Groups.name, schema: groups_schema_1.GroupsSchema },
                { name: group_schema_1.Group.name, schema: group_schema_1.GroupSchema },
            ]),
            group_module_1.GroupModule,
        ],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                { name: campaign_schema_1.Campaign.name, schema: campaign_schema_1.CampaignSchema },
            ]),
        ],
        controllers: [campaign_controller_1.CampaignController],
        providers: [campaign_service_1.CampaignService, winston_1.Logger],
    })
], CampaignModule);
//# sourceMappingURL=campaign.module.js.map