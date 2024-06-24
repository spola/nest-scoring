import { Test, TestingModule } from '@nestjs/testing';
import { ClientsToDoFollowUpService } from './clients-to-do-follow-up.service';

describe('ClientsToDoFollowUpService', () => {
  let service: ClientsToDoFollowUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsToDoFollowUpService],
    }).compile();

    service = module.get<ClientsToDoFollowUpService>(ClientsToDoFollowUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
