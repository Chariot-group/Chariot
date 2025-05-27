"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const group_service_1 = require("./group.service");
describe('GroupService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [group_service_1.GroupService],
        }).compile();
        service = module.get(group_service_1.GroupService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=group.service.spec.js.map