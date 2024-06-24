import { Test, TestingModule } from '@nestjs/testing';
import { ClientsToDoFollowUpController } from './clients-to-do-follow-up.controller';
import { ClientsToDoFollowUpService } from './clients-to-do-follow-up.service';

describe('ClientsToDoFollowUpController', () => {
  let controller: ClientsToDoFollowUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsToDoFollowUpController],
      providers: [ClientsToDoFollowUpService],
    }).compile();

    controller = module.get<ClientsToDoFollowUpController>(ClientsToDoFollowUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
