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
exports.PlayerStatsSchema = exports.PlayerStats = void 0;
const stats_schema_1 = require("../../../core/schemas/stats/stats.schema");
const mongoose_1 = require("@nestjs/mongoose");
let PlayerStats = class PlayerStats extends stats_schema_1.Stats {
};
exports.PlayerStats = PlayerStats;
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PlayerStats.prototype, "proficiencyBonus", void 0);
exports.PlayerStats = PlayerStats = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PlayerStats);
exports.PlayerStatsSchema = mongoose_1.SchemaFactory.createForClass(PlayerStats);
//# sourceMappingURL=player-stats.schema.js.map