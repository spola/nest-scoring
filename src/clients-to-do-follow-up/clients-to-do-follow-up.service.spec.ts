import { Test, TestingModule } from '@nestjs/testing';
import { ClientsToDoFollowUpService } from './clients-to-do-follow-up.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../clients/entities/client.entity';
import { ClientToDoFollowUpView } from './entities/client-to-do-follow-up-view.entity';

describe('ClientsToDoFollowUpService', () => {
  let service: ClientsToDoFollowUpService;

  let clientRepository: Repository<ClientEntity>;
  let clientRepositoryToken: string | Function =
    getRepositoryToken(ClientEntity);

  let clientToDoFollowUpViewRepository: Repository<ClientToDoFollowUpView>;
  let clientToDoFollowUpViewToken: string | Function =
    getRepositoryToken(ClientToDoFollowUpView);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsToDoFollowUpService,
        {
          provide: clientRepositoryToken,
          useClass: Repository,
          useValue: {},
        },
        {
          provide: clientToDoFollowUpViewToken,
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ClientsToDoFollowUpService>(
      ClientsToDoFollowUpService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
