"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const npc_service_1 = require("./npc.service");
describe('NpcService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [npc_service_1.NpcService],
        }).compile();
        service = module.get(npc_service_1.NpcService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=npc.service.spec.js.map