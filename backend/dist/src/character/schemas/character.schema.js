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
const classification_schema_1 = require("./classification/classification.schema");
const stats_schema_1 = require("./stat/stats.schema");
const combat_schema_1 = require("./combat/combat.schema");
const trait_schema_1 = require("./trait/trait.schema");
const actions_schema_1 = require("./actions/actions.schema");
let Character = class Character {
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
    (0, mongoose_1.Prop)({ type: classification_schema_1.Classification, required: true }),
    __metadata("design:type", classification_schema_1.Classification)
], Character.prototype, "classification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: stats_schema_1.Stats, required: true }),
    __metadata("design:type", stats_schema_1.Stats)
], Character.prototype, "stats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: combat_schema_1.Combat, required: true }),
    __metadata("design:type", combat_schema_1.Combat)
], Character.prototype, "combat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [trait_schema_1.Traits], required: true, default: [] }),
    __metadata("design:type", Array)
], Character.prototype, "traits", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [actions_schema_1.Actions], required: true, default: [] }),
    __metadata("design:type", Array)
], Character.prototype, "actions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Group' }], default: [], required: true }),
    __metadata("design:type", Array)
], Character.prototype, "groups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], Character.prototype, "deletedAt", void 0);
exports.Character = Character = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Character);
exports.CharacterSchema = mongoose_1.SchemaFactory.createForClass(Character);
//# sourceMappingURL=character.schema.js.map