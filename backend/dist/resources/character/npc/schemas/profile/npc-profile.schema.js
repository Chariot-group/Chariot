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
exports.NPCProfileSchema = exports.NPCProfile = void 0;
const profile_schema_1 = require("../../../core/schemas/profile/profile.schema");
const mongoose_1 = require("@nestjs/mongoose");
let NPCProfile = class NPCProfile extends profile_schema_1.Profile {
};
exports.NPCProfile = NPCProfile;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NPCProfile.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NPCProfile.prototype, "subtype", void 0);
exports.NPCProfile = NPCProfile = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NPCProfile);
exports.NPCProfileSchema = mongoose_1.SchemaFactory.createForClass(NPCProfile);
//# sourceMappingURL=npc-profile.schema.js.map