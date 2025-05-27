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
exports.DamageSchema = exports.Damage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Damage = class Damage {
};
exports.Damage = Damage;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Damage.prototype, "dice", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Damage.prototype, "type", void 0);
exports.Damage = Damage = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Damage);
exports.DamageSchema = mongoose_1.SchemaFactory.createForClass(Damage);
//# sourceMappingURL=damage.schema.js.map