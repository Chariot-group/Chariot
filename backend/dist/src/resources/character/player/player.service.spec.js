"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const player_service_1 = require("./player.service");
describe('PlayerService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [player_service_1.PlayerService],
        }).compile();
        service = module.get(player_service_1.PlayerService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=player.service.spec.js.map