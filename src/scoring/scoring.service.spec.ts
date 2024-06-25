import { Test, TestingModule } from '@nestjs/testing';
import { ScoringService } from './scoring.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../clients/entities/client.entity';

describe('ScoringService', () => {
  let service: ScoringService;

  let clientRepository: Repository<ClientEntity>;
  let clientRepositoryToken: string | Function =
    getRepositoryToken(ClientEntity);

  // let clientToDoFollowUpViewRepository: Repository<ClientToDoFollowUpView>;
  // let clientToDoFollowUpViewToken: string | Function =
  //   getRepositoryToken(ClientToDoFollowUpView);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoringService,
        {
          provide: clientRepositoryToken,
          useClass: Repository,
          useValue: {},
        },
      ],
      // {
      //   provide: clientToDoFollowUpViewToken,
      //   useClass: Repository,
      //   useValue: {},
      // },
    }).compile();

    service = module.get<ScoringService>(ScoringService);
    clientRepository = module.get<Repository<ClientEntity>>(
      clientRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(clientRepository).toBeDefined();
  });
});
