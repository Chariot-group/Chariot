"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const character_schema_1 = require("./core/schemas/character.schema");
const group_schema_1 = require("../group/schemas/group.schema");
const player_schema_1 = require("./player/schemas/player.schema");
const npc_schema_1 = require("./npc/schemas/npc.schema");
const npc_module_1 = require("./npc/npc.module");
const player_module_1 = require("./player/player.module");
const character_service_1 = require("./character.service");
const character_controller_1 = require("./character.controller");
let CharacterModule = class CharacterModule {
};
exports.CharacterModule = CharacterModule;
exports.CharacterModule = CharacterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: character_schema_1.Character.name,
                    schema: character_schema_1.CharacterSchema,
                    discriminators: [
                        { name: 'player', schema: player_schema_1.PlayerSchema },
                        { name: 'npc', schema: npc_schema_1.NPCSchema },
                    ],
                },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: group_schema_1.Group.name, schema: group_schema_1.GroupSchema }]),
            npc_module_1.NpcModule,
            player_module_1.PlayerModule,
        ],
        exports: [character_service_1.CharacterService],
        controllers: [character_controller_1.CharacterController],
        providers: [character_service_1.CharacterService],
    })
], CharacterModule);
//# sourceMappingURL=character.module.js.map