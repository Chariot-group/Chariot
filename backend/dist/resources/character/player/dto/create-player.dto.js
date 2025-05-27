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
exports.CreatePlayerDto = void 0;
const create_character_dto_1 = require("../../core/dto/create-character.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const progression_dto_1 = require("./progression/progression.dto");
const class_dto_1 = require("./class/class.dto");
const player_profile_dto_1 = require("./profile/player-profile.dto");
const appearance_dto_1 = require("./appearance/appearance.dto");
const background_dto_1 = require("./background/background.dto");
const treasure_dto_1 = require("./treasure/treasure.dto");
const player_stats_dto_1 = require("./stats/player-stats.dto");
class CreatePlayerDto extends create_character_dto_1.CreateCharacterDto {
}
exports.CreatePlayerDto = CreatePlayerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePlayerDto.prototype, "inspiration", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => progression_dto_1.ProgressionDto),
    __metadata("design:type", progression_dto_1.ProgressionDto)
], CreatePlayerDto.prototype, "progression", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => class_dto_1.ClassDto),
    __metadata("design:type", Array)
], CreatePlayerDto.prototype, "class", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => player_profile_dto_1.PlayerProfileDto),
    __metadata("design:type", player_profile_dto_1.PlayerProfileDto)
], CreatePlayerDto.prototype, "profile", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => appearance_dto_1.AppearanceDto),
    __metadata("design:type", appearance_dto_1.AppearanceDto)
], CreatePlayerDto.prototype, "appearance", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => background_dto_1.BackgroundDto),
    __metadata("design:type", background_dto_1.BackgroundDto)
], CreatePlayerDto.prototype, "background", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => treasure_dto_1.TreasureDto),
    __metadata("design:type", treasure_dto_1.TreasureDto)
], CreatePlayerDto.prototype, "treasure", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => player_stats_dto_1.PlayerStatsDto),
    __metadata("design:type", player_stats_dto_1.PlayerStatsDto)
], CreatePlayerDto.prototype, "stats", void 0);
//# sourceMappingURL=create-player.dto.js.map