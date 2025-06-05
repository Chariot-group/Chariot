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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNpcDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const actions_dto_1 = require("./actions/actions.dto");
const challenge_dto_1 = require("./challenge/challenge.dto");
const create_character_dto_1 = require("../../core/dto/create-character.dto");
const npc_profile_dto_1 = require("./profile/npc-profile.dto");
class CreateNpcDto extends create_character_dto_1.CreateCharacterDto {
}
exports.CreateNpcDto = CreateNpcDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => actions_dto_1.ActionsDto),
    __metadata("design:type", actions_dto_1.ActionsDto)
], CreateNpcDto.prototype, "actions", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => challenge_dto_1.ChallengeDto),
    __metadata("design:type", challenge_dto_1.ChallengeDto)
], CreateNpcDto.prototype, "challenge", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => npc_profile_dto_1.NPCProfileDto),
    __metadata("design:type", npc_profile_dto_1.NPCProfileDto)
], CreateNpcDto.prototype, "profile", void 0);
//# sourceMappingURL=create-npc.dto.js.map