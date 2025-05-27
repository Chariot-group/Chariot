import { Test, TestingModule } from '@nestjs/testing';
import { MaillingService } from '@/mailling/mailling.service';

describe('MaillingService', () => {
  let service: MaillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaillingService],
    }).compile();

    service = module.get<MaillingService>(MaillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
