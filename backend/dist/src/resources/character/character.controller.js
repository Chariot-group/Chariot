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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const common_1 = require("@nestjs/common");
const character_service_1 = require("./character.service");
const is_creator_decorator_1 = require("../../common/decorators/is-creator.decorator");
const is_creator_guard_1 = require("../../common/guards/is-creator.guard");
const parse_nullable_int_pipe_1 = require("../../common/pipes/parse-nullable-int.pipe");
let CharacterController = class CharacterController {
    constructor(characterService) {
        this.characterService = characterService;
    }
    findAll(request, page, offset, name, sort) {
        const userId = request.user.userId;
        return this.characterService.findAllByUser(userId, {
            page,
            offset,
            name,
            sort,
        });
    }
    findOne(id) {
        return this.characterService.findOne(id);
    }
    remove(id) {
        return this.characterService.remove(id);
    }
};
exports.CharacterController = CharacterController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page', parse_nullable_int_pipe_1.ParseNullableIntPipe)),
    __param(2, (0, common_1.Query)('offset', parse_nullable_int_pipe_1.ParseNullableIntPipe)),
    __param(3, (0, common_1.Query)('name')),
    __param(4, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], CharacterController.prototype, "findAll", null);
__decorate([
    (0, is_creator_decorator_1.IsCreator)(character_service_1.CharacterService),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CharacterController.prototype, "findOne", null);
__decorate([
    (0, is_creator_decorator_1.IsCreator)(character_service_1.CharacterService),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CharacterController.prototype, "remove", null);
exports.CharacterController = CharacterController = __decorate([
    (0, common_1.UseGuards)(is_creator_guard_1.IsCreatorGuard),
    (0, common_1.Controller)('characters'),
    __metadata("design:paramtypes", [character_service_1.CharacterService])
], CharacterController);
//# sourceMappingURL=character.controller.js.map