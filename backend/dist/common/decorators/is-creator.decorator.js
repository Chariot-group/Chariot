"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_CREATOR_KEY = void 0;
exports.IsCreator = IsCreator;
const common_1 = require("@nestjs/common");
const is_creator_guard_1 = require("../guards/is-creator.guard");
exports.IS_CREATOR_KEY = 'isCreatorService';
function IsCreator(serviceClass) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('service', serviceClass), (0, common_1.UseGuards)(is_creator_guard_1.IsCreatorGuard));
}
//# sourceMappingURL=is-creator.decorator.js.map