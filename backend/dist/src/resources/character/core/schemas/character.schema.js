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
exports.CharacterSchema = exports.Character = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const affinities_schema_1 = require("./affinities/affinities.schema");
const base_schema_1 = require("../../../../common/schemas/base-schema");
const ability_schema_1 = require("./ability/ability.schema");
const spellcasting_schema_1 = require("./spellcasting/spellcasting.schema");
const stats_schema_1 = require("./stats/stats.schema");
let Character = class Character extends base_schema_1.BaseSchema {
};
exports.Character = Character;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, auto: true }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Character.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: stats_schema_1.Stats, default: {} }),
    __metadata("design:type", stats_schema_1.Stats)
], Character.prototype, "stats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: affinities_schema_1.Affinities, default: {} }),
    __metadata("design:type", affinities_schema_1.Affinities)
], Character.prototype, "affinities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ability_schema_1.Ability], default: [] }),
    __metadata("design:type", Array)
], Character.prototype, "abilities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [spellcasting_schema_1.Spellcasting], default: [] }),
    __metadata("design:type", Array)
], Character.prototype, "spellcasting", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Group' }],
        default: [],
        required: true,
    }),
    __metadata("design:type", Array)
], Character.prototype, "groups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], Character.prototype, "deletedAt", void 0);
exports.Character = Character = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, discriminatorKey: 'kind' })
], Character);
exports.CharacterSchema = mongoose_1.SchemaFactory.createForClass(Character);
//# sourceMappingURL=character.schema.js.map