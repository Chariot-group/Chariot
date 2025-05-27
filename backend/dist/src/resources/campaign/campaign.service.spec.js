"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const campaign_service_1 = require("./campaign.service");
describe('CampaignService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [campaign_service_1.CampaignService],
        }).compile();
        service = module.get(campaign_service_1.CampaignService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=campaign.service.spec.js.map