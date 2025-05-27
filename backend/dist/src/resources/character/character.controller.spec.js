"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const character_controller_1 = require("./character.controller");
const character_service_1 = require("./character.service");
describe('CharacterController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [character_controller_1.CharacterController],
            providers: [character_service_1.CharacterService],
        }).compile();
        controller = module.get(character_controller_1.CharacterController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=character.controller.spec.js.map