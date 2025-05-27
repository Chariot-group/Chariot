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
exports.StatsDto = void 0;
const class_validator_1 = require("class-validator");
const abilityScores_dto_1 = require("./sub/abilityScores.dto");
const class_transformer_1 = require("class-transformer");
const savingThrows_dto_1 = require("./sub/savingThrows.dto");
const speed_dto_1 = require("./sub/speed.dto");
const skill_dto_1 = require("./sub/skill.dto");
const sense_1 = require("./sub/sense");
class StatsDto {
}
exports.StatsDto = StatsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], StatsDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StatsDto.prototype, "maxHitPoints", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StatsDto.prototype, "currentHitPoints", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StatsDto.prototype, "tempHitPoints", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StatsDto.prototype, "armorClass", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StatsDto.prototype, "passivePerception", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StatsDto.prototype, "darkvision", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], StatsDto.prototype, "languages", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => abilityScores_dto_1.AbilityScoresDto),
    __metadata("design:type", abilityScores_dto_1.AbilityScoresDto)
], StatsDto.prototype, "abilityScores", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => savingThrows_dto_1.SavingThrowsDto),
    __metadata("design:type", savingThrows_dto_1.SavingThrowsDto)
], StatsDto.prototype, "savingThrows", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => speed_dto_1.SpeedDto),
    __metadata("design:type", speed_dto_1.SpeedDto)
], StatsDto.prototype, "speed", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => skill_dto_1.SkillDto),
    __metadata("design:type", skill_dto_1.SkillDto)
], StatsDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => sense_1.SenseDto),
    __metadata("design:type", Array)
], StatsDto.prototype, "senses", void 0);
//# sourceMappingURL=stats.dto.js.map