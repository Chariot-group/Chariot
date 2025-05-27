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
const stats_dto_1 = require("./stats/stats.dto");
const affinities_dto_1 = require("./affinities/affinities.dto");
const ability_dto_1 = require("./ability/ability.dto");
const spellcasting_dto_1 = require("./spellcasting/spellcasting.dto");
class CreateCharacterDto {
}
exports.CreateCharacterDto = CreateCharacterDto;
__decorate([
    (0, class_validator_1.IsString)(),
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
    (0, class_transformer_1.Type)(() => stats_dto_1.StatsDto),
    __metadata("design:type", stats_dto_1.StatsDto)
], CreateCharacterDto.prototype, "stats", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => affinities_dto_1.AffinitiesDto),
    __metadata("design:type", affinities_dto_1.AffinitiesDto)
], CreateCharacterDto.prototype, "affinities", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ability_dto_1.AbilityDto),
    __metadata("design:type", Array)
], CreateCharacterDto.prototype, "abilities", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => spellcasting_dto_1.SpellcastingDto),
    __metadata("design:type", Array)
], CreateCharacterDto.prototype, "spellcasting", void 0);
//# sourceMappingURL=create-character.dto.js.map