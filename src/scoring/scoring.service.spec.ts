import { Test, TestingModule } from '@nestjs/testing';
import { ScoringService } from './scoring.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../clients/entities/client.entity';
import { ClientToScoreView } from './entities/client-to-score-view.entity';

describe('ScoringService', () => {
  let service: ScoringService;

  let clientRepository: Repository<ClientEntity>;
  let clientRepositoryToken: string | Function =
    getRepositoryToken(ClientEntity);

  let clientToScoreViewRepository: Repository<ClientToScoreView>;
  let clientToScoreViewToken: string | Function =
    getRepositoryToken(ClientToScoreView);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoringService,
        {
          provide: clientRepositoryToken,
          useClass: Repository,
          useValue: {},
        },
        {
          provide: clientToScoreViewToken,
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ScoringService>(ScoringService);
    clientRepository = module.get<Repository<ClientEntity>>(
      clientRepositoryToken,
    );
    clientToScoreViewRepository = module.get<Repository<ClientToScoreView>>(
      clientToScoreViewToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(clientRepository).toBeDefined();
    expect(clientToScoreViewRepository).toBeDefined();
  });
});
