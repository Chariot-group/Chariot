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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const create_player_dto_1 = require("./dto/create-player.dto");
const update_player_dto_1 = require("./dto/update-player.dto");
const is_creator_decorator_1 = require("../../../common/decorators/is-creator.decorator");
const character_service_1 = require("../character.service");
let PlayerController = class PlayerController {
    constructor(playerService, characterService) {
        this.playerService = playerService;
        this.characterService = characterService;
    }
    createPlayer(request, createPlayerDto) {
        const userId = request.user.userId;
        return this.playerService.create(createPlayerDto, userId);
    }
    update(id, updatePlayerDto) {
        return this.playerService.update(id, updatePlayerDto);
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_player_dto_1.CreatePlayerDto]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "createPlayer", null);
__decorate([
    (0, is_creator_decorator_1.IsCreator)(character_service_1.CharacterService),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_player_dto_1.UpdatePlayerDto]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "update", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('characters/players'),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        character_service_1.CharacterService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map