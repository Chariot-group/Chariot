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
exports.IsCreatorGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const core_2 = require("@nestjs/core");
let IsCreatorGuard = class IsCreatorGuard {
    constructor(reflector, moduleRef) {
        this.reflector = reflector;
        this.moduleRef = moduleRef;
    }
    async canActivate(context) {
        const handler = context.getHandler();
        const serviceClass = this.reflector.get('service', handler);
        if (!serviceClass)
            return true;
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.userId;
        const resourceId = request.params?.id;
        if (!userId)
            throw new common_1.UnauthorizedException('User not authenticated');
        if (!resourceId)
            throw new common_1.ForbiddenException('Missing resource id');
        try {
            const service = await this.moduleRef.resolve(serviceClass);
            if (!service) {
                throw new common_1.ForbiddenException(`Service ${serviceClass} not found`);
            }
            const resource = await service.findOne(resourceId);
            if (!resource)
                throw new common_1.ForbiddenException('Resource not found');
            if (resource.data.createdBy?.toString() !== userId.toString()) {
                throw new common_1.ForbiddenException('Forbidden: not the creator');
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.IsCreatorGuard = IsCreatorGuard;
exports.IsCreatorGuard = IsCreatorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        core_2.ModuleRef])
], IsCreatorGuard);
//# sourceMappingURL=is-creator.guard.js.map