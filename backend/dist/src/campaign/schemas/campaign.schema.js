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
exports.CampaignSchema = exports.Campaign = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const groups_schema_1 = require("./sub/groups.schema");
let Campaign = class Campaign {
};
exports.Campaign = Campaign;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, auto: true }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Campaign.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Campaign.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Campaign.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: groups_schema_1.Groups, required: true }),
    __metadata("design:type", groups_schema_1.Groups)
], Campaign.prototype, "groups", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Campaign.prototype, "users", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], Campaign.prototype, "deletedAt", void 0);
exports.Campaign = Campaign = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Campaign);
exports.CampaignSchema = mongoose_1.SchemaFactory.createForClass(Campaign);
//# sourceMappingURL=campaign.schema.js.map