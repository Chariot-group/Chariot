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
exports.NPCSchema = exports.NPC = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const actions_schema_1 = require("./actions/actions.schema");
const challenge_schema_1 = require("./challenge/challenge.schema");
const npc_profile_schema_1 = require("./profile/npc-profile.schema");
const character_schema_1 = require("../../core/schemas/character.schema");
let NPC = class NPC extends character_schema_1.Character {
};
exports.NPC = NPC;
__decorate([
    (0, mongoose_1.Prop)({ type: actions_schema_1.Actions, default: {} }),
    __metadata("design:type", actions_schema_1.Actions)
], NPC.prototype, "actions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: challenge_schema_1.Challenge, default: {} }),
    __metadata("design:type", challenge_schema_1.Challenge)
], NPC.prototype, "challenge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: npc_profile_schema_1.NPCProfile, default: {} }),
    __metadata("design:type", npc_profile_schema_1.NPCProfile)
], NPC.prototype, "profile", void 0);
exports.NPC = NPC = __decorate([
    (0, mongoose_1.Schema)()
], NPC);
exports.NPCSchema = mongoose_1.SchemaFactory.createForClass(NPC);
//# sourceMappingURL=npc.schema.js.map