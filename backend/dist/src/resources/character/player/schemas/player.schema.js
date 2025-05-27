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
exports.PlayerSchema = exports.Player = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const character_schema_1 = require("../../core/schemas/character.schema");
const progression_schema_1 = require("./progression/progression.schema");
const class_schema_1 = require("./class/class.schema");
const player_profile_schema_1 = require("./profile/player-profile.schema");
const appearance_schema_1 = require("./appearance/appearance.schema");
const background_schema_1 = require("./background/background.schema");
const treasure_schema_1 = require("./treasure/treasure.schema");
const player_stats_schema_1 = require("./stats/player-stats.schema");
let Player = class Player extends character_schema_1.Character {
};
exports.Player = Player;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Player.prototype, "inspiration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: progression_schema_1.Progression, default: {} }),
    __metadata("design:type", progression_schema_1.Progression)
], Player.prototype, "progression", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [class_schema_1.Class], default: [] }),
    __metadata("design:type", Array)
], Player.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: player_profile_schema_1.PlayerProfile, default: {} }),
    __metadata("design:type", player_profile_schema_1.PlayerProfile)
], Player.prototype, "profile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: appearance_schema_1.Appearance, default: {} }),
    __metadata("design:type", appearance_schema_1.Appearance)
], Player.prototype, "appearance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: background_schema_1.Background, default: {} }),
    __metadata("design:type", background_schema_1.Background)
], Player.prototype, "background", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: treasure_schema_1.Treasure, default: {} }),
    __metadata("design:type", treasure_schema_1.Treasure)
], Player.prototype, "treasure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: player_stats_schema_1.PlayerStats, default: {} }),
    __metadata("design:type", player_stats_schema_1.PlayerStats)
], Player.prototype, "stats", void 0);
exports.Player = Player = __decorate([
    (0, mongoose_1.Schema)()
], Player);
exports.PlayerSchema = mongoose_1.SchemaFactory.createForClass(Player);
//# sourceMappingURL=player.schema.js.map