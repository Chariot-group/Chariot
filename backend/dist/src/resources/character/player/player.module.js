"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModule = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const player_controller_1 = require("./player.controller");
const mongoose_1 = require("@nestjs/mongoose");
const group_schema_1 = require("../../group/schemas/group.schema");
const character_service_1 = require("../character.service");
const character_schema_1 = require("../core/schemas/character.schema");
let PlayerModule = class PlayerModule {
};
exports.PlayerModule = PlayerModule;
exports.PlayerModule = PlayerModule = __decorate([
    (0, common_1.Module)({
        controllers: [player_controller_1.PlayerController],
        providers: [player_service_1.PlayerService, character_service_1.CharacterService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: group_schema_1.Group.name, schema: group_schema_1.GroupSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: character_schema_1.Character.name, schema: character_schema_1.CharacterSchema },
            ]),
        ],
    })
], PlayerModule);
//# sourceMappingURL=player.module.js.map