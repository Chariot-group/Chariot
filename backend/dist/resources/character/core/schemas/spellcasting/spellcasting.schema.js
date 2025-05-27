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
exports.SpellcastingSchema = exports.Spellcasting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mongoose_3 = require("mongoose");
const spell_schema_1 = require("./sub/spell.schema");
let Spellcasting = class Spellcasting {
};
exports.Spellcasting = Spellcasting;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Spellcasting.prototype, "ability", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Spellcasting.prototype, "saveDC", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Spellcasting.prototype, "attackBonus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Map,
        of: new mongoose_3.Schema({
            total: { type: Number, default: 0 },
            used: { type: Number, default: 0 },
        }, { _id: false }),
    }),
    __metadata("design:type", Map)
], Spellcasting.prototype, "spellSlotsByLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Spellcasting.prototype, "totalSlots", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [spell_schema_1.Spell], default: [] }),
    __metadata("design:type", Array)
], Spellcasting.prototype, "spells", void 0);
exports.Spellcasting = Spellcasting = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Spellcasting);
exports.SpellcastingSchema = mongoose_2.SchemaFactory.createForClass(Spellcasting);
//# sourceMappingURL=spellcasting.schema.js.map