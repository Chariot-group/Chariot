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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const create_group_dto_1 = require("./dto/create-group.dto");
const update_group_dto_1 = require("./dto/update-group.dto");
const parse_nullable_int_pipe_1 = require("../pipes/parse-nullable-int.pipe");
const character_service_1 = require("../character/character.service");
let GroupController = class GroupController {
    constructor(groupService, characterService) {
        this.groupService = groupService;
        this.characterService = characterService;
    }
    create(createGroupDto) {
        return this.groupService.create(createGroupDto);
    }
    findAll(page, offset, label, sort) {
        return this.groupService.findAll({ page, offset, label, sort });
    }
    findAllCharacters(id, page, offset, name, sort) {
        return this.characterService.findAll({ page, offset, name, sort }, id);
    }
    findOne(id) {
        return this.groupService.findOne(id);
    }
    update(id, updateGroupDto) {
        return this.groupService.update(id, updateGroupDto);
    }
    remove(id) {
        return this.groupService.remove(id);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', parse_nullable_int_pipe_1.ParseNullableIntPipe)),
    __param(1, (0, common_1.Query)('offset', parse_nullable_int_pipe_1.ParseNullableIntPipe)),
    __param(2, (0, common_1.Query)('label')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/characters'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)("page", parse_nullable_int_pipe_1.ParseNullableIntPipe)),
    __param(2, (0, common_1.Query)('offset', parse_nullable_int_pipe_1.ParseNullableIntPipe)),
    __param(3, (0, common_1.Query)('name')),
    __param(4, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "findAllCharacters", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_group_dto_1.UpdateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "remove", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [group_service_1.GroupService,
        character_service_1.CharacterService])
], GroupController);
//# sourceMappingURL=group.controller.js.map