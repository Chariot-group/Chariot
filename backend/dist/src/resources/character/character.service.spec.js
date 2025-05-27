"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const character_service_1 = require("./character.service");
describe('CharacterService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [character_service_1.CharacterService],
        }).compile();
        service = module.get(character_service_1.CharacterService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=character.service.spec.js.map