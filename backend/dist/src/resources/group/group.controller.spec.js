"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const group_controller_1 = require("./group.controller");
const group_service_1 = require("./group.service");
describe('GroupController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [group_controller_1.GroupController],
            providers: [group_service_1.GroupService],
        }).compile();
        controller = module.get(group_controller_1.GroupController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=group.controller.spec.js.map