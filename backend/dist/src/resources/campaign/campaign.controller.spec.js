"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const campaign_controller_1 = require("./campaign.controller");
const campaign_service_1 = require("./campaign.service");
describe('CampaignController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [campaign_controller_1.CampaignController],
            providers: [campaign_service_1.CampaignService],
        }).compile();
        controller = module.get(campaign_controller_1.CampaignController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=campaign.controller.spec.js.map