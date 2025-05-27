"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const npc_controller_1 = require("./npc.controller");
const npc_service_1 = require("./npc.service");
describe('NpcController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [npc_controller_1.NpcController],
            providers: [npc_service_1.NpcService],
        }).compile();
        controller = module.get(npc_controller_1.NpcController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=npc.controller.spec.js.map