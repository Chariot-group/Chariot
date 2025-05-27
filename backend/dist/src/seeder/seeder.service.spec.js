"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const seeder_service_1 = require("./seeder.service");
describe('SeederService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [seeder_service_1.SeederService],
        }).compile();
        service = module.get(seeder_service_1.SeederService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=seeder.service.spec.js.map