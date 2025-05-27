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
exports.Stats = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const speed_schema_1 = require("./sub/speed.schema");
const abilityScores_schema_1 = require("./sub/abilityScores.schema");
const savingThrows_schema_1 = require("./sub/savingThrows.schema");
const skill_schema_1 = require("./sub/skill.schema");
const sense_schema_1 = require("./sub/sense.schema");
let Stats = class Stats {
};
exports.Stats = Stats;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Stats.prototype, "maxHitPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Stats.prototype, "currentHitPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Stats.prototype, "tempHitPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Stats.prototype, "hitDice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Stats.prototype, "armorClass", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: speed_schema_1.Speed, required: true }),
    __metadata("design:type", speed_schema_1.Speed)
], Stats.prototype, "speed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: abilityScores_schema_1.AbilityScores, required: true }),
    __metadata("design:type", abilityScores_schema_1.AbilityScores)
], Stats.prototype, "abilityScores", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: savingThrows_schema_1.SavingThrows }),
    __metadata("design:type", savingThrows_schema_1.SavingThrows)
], Stats.prototype, "savingThrows", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: skill_schema_1.Skills }),
    __metadata("design:type", skill_schema_1.Skills)
], Stats.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: sense_schema_1.Senses, required: true }),
    __metadata("design:type", sense_schema_1.Senses)
], Stats.prototype, "senses", void 0);
exports.Stats = Stats = __decorate([
    (0, mongoose_1.Schema)()
], Stats);
//# sourceMappingURL=stats.schema.js.map