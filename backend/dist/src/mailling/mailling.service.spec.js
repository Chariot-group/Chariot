"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mailling_service_1 = require("./mailling.service");
describe('MaillingService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [mailling_service_1.MaillingService],
        }).compile();
        service = module.get(mailling_service_1.MaillingService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=mailling.service.spec.js.map