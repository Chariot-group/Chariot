"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const player_controller_1 = require("./player.controller");
const player_service_1 = require("./player.service");
describe('PlayerController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [player_controller_1.PlayerController],
            providers: [player_service_1.PlayerService],
        }).compile();
        controller = module.get(player_controller_1.PlayerController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=player.controller.spec.js.map