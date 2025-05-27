"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./resources/user/user.module");
const group_module_1 = require("./resources/group/group.module");
const campaign_module_1 = require("./resources/campaign/campaign.module");
const seeder_module_1 = require("./seeder/seeder.module");
const auth_module_1 = require("./resources/auth/auth.module");
const mailling_service_1 = require("./mailling/mailling.service");
const mailling_module_1 = require("./mailling/mailling.module");
const character_module_1 = require("./resources/character/character.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL),
            user_module_1.UserModule,
            character_module_1.CharacterModule,
            group_module_1.GroupModule,
            campaign_module_1.CampaignModule,
            seeder_module_1.SeederModule,
            auth_module_1.AuthModule,
            mailling_module_1.MaillingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_1.Logger, mailling_service_1.MaillingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map