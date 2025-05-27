"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNpcDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_npc_dto_1 = require("./create-npc.dto");
class UpdateNpcDto extends (0, mapped_types_1.PartialType)(create_npc_dto_1.CreateNpcDto) {
}
exports.UpdateNpcDto = UpdateNpcDto;
//# sourceMappingURL=update-npc.dto.js.map