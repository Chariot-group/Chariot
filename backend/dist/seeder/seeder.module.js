"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const campaign_schema_1 = require("../resources/campaign/schemas/campaign.schema");
const group_schema_1 = require("../resources/group/schemas/group.schema");
const user_schema_1 = require("../resources/user/schemas/user.schema");
const seeder_service_1 = require("./seeder.service");
const character_schema_1 = require("../resources/character/core/schemas/character.schema");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: campaign_schema_1.Campaign.name, schema: campaign_schema_1.CampaignSchema },
                { name: character_schema_1.Character.name, schema: character_schema_1.CharacterSchema },
                { name: group_schema_1.Group.name, schema: group_schema_1.GroupSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [seeder_service_1.SeederService],
        exports: [seeder_service_1.SeederService],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map