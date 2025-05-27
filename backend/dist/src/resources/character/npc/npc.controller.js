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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcController = void 0;
const common_1 = require("@nestjs/common");
const npc_service_1 = require("./npc.service");
const create_npc_dto_1 = require("./dto/create-npc.dto");
const update_npc_dto_1 = require("./dto/update-npc.dto");
const is_creator_decorator_1 = require("../../../common/decorators/is-creator.decorator");
const character_service_1 = require("../character.service");
let NpcController = class NpcController {
    constructor(npcService, characterService) {
        this.npcService = npcService;
        this.characterService = characterService;
    }
    createNpc(request, createNpcDto) {
        const userId = request.user.userId;
        return this.npcService.create(createNpcDto, userId);
    }
    update(id, updateNpcDto) {
        return this.npcService.update(id, updateNpcDto);
    }
};
exports.NpcController = NpcController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_npc_dto_1.CreateNpcDto]),
    __metadata("design:returntype", void 0)
], NpcController.prototype, "createNpc", null);
__decorate([
    (0, is_creator_decorator_1.IsCreator)(character_service_1.CharacterService),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_npc_dto_1.UpdateNpcDto]),
    __metadata("design:returntype", void 0)
], NpcController.prototype, "update", null);
exports.NpcController = NpcController = __decorate([
    (0, common_1.Controller)('characters/npcs'),
    __metadata("design:paramtypes", [npc_service_1.NpcService,
        character_service_1.CharacterService])
], NpcController);
//# sourceMappingURL=npc.controller.js.map