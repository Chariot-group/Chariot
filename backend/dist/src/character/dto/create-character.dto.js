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
exports.CreateCharacterDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const classification_dto_1 = require("./sub/classification.dto");
const stats_dto_1 = require("./sub/stats.dto");
const combat_dto_1 = require("./sub/combat.dto");
const traits_dto_1 = require("./sub/traits.dto");
const actions_dto_1 = require("./sub/actions.dto");
class CreateCharacterDto {
}
exports.CreateCharacterDto = CreateCharacterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCharacterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCharacterDto.prototype, "groups", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => classification_dto_1.ClassificationDto),
    __metadata("design:type", classification_dto_1.ClassificationDto)
], CreateCharacterDto.prototype, "classification", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => stats_dto_1.StatsDto),
    __metadata("design:type", stats_dto_1.StatsDto)
], CreateCharacterDto.prototype, "stats", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => combat_dto_1.CombatDto),
    __metadata("design:type", combat_dto_1.CombatDto)
], CreateCharacterDto.prototype, "combat", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => traits_dto_1.TraitsDto),
    __metadata("design:type", traits_dto_1.TraitsDto)
], CreateCharacterDto.prototype, "traits", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => actions_dto_1.ActionsDto),
    __metadata("design:type", actions_dto_1.ActionsDto)
], CreateCharacterDto.prototype, "actions", void 0);
//# sourceMappingURL=create-character.dto.js.map