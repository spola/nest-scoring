import { Test, TestingModule } from '@nestjs/testing';
import { ScoringService } from './scoring.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../clients/entities/client.entity';
import { ClientToScoreView } from './entities/client-to-score-view.entity';

describe('ScoringService', () => {
  let service: ScoringService;

  let clientToScoreViewRepository: Repository<ClientToScoreView>;
  let clientToScoreViewToken: string | Function =
    getRepositoryToken(ClientToScoreView);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoringService,
        {
          provide: clientToScoreViewToken,
          useClass: Repository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    clientToScoreViewRepository = module.get<Repository<ClientToScoreView>>(
      clientToScoreViewToken,
    );
    service = module.get<ScoringService>(ScoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(clientToScoreViewRepository).toBeDefined();
  });

  describe('should create vector', () => {
    it('for user without salary and messages', () => {
      let data = {
        id: 1,
        countDebts: 0,
        lastMessages: 0,
        salary: 0,
        savings: 0,
        totalDebts: 0,
        totalMessages: 0,
      } as ClientToScoreView;

      let vector = service.createVector(data, 6000, 20);
      expect(vector).toHaveProperty('interest', 0);
      expect(vector).toHaveProperty('purshaseCapacity', 0);
      expect(vector).toHaveProperty('monthOfDebts', Number.POSITIVE_INFINITY);
      expect(vector).toHaveProperty('realSavings', 0);
    });
  });

  describe('should calculate scoring for ', () => {
    it('should throw NotFound', async () => {
      jest
        .spyOn(clientToScoreViewRepository, 'findOne')
        .mockResolvedValueOnce(null);

      let res = service.calculate(1);
      expect(res).rejects.toThrow(NotFoundException);
    });

    it('client 1', async () => {
      let data = {
        id: 1,
        countDebts: 2,
        totalDebts: 3000000,
        totalMessages: 30,
        lastMessages: 30,
        salary: 2000000,
        savings: 10000000,
      } as ClientToScoreView;
      jest
        .spyOn(clientToScoreViewRepository, 'findOne')
        .mockResolvedValueOnce(data);

      let res = service.calculate(1);

      expect(res).resolves.toHaveProperty('scoring');
    });

    it('client 0', async () => {
      let data = {
        id: 1,
        countDebts: 0,
        lastMessages: 0,
        salary: 0,
        savings: 0,
        totalDebts: 0,
        totalMessages: 0,
      } as ClientToScoreView;

      jest
        .spyOn(clientToScoreViewRepository, 'findOne')
        .mockResolvedValueOnce(data);

      let res = await service.calculate(1);
      expect(res).toHaveProperty('scoring', 0);
    });

    it('client 100', async () => {
      let data = {
        id: 1,
        countDebts: 0,
        lastMessages: 10,
        salary: 3000000,
        savings: service.convertCost(600),
        totalDebts: 0,
        totalMessages: 10,
      } as ClientToScoreView;

      jest
        .spyOn(clientToScoreViewRepository, 'findOne')
        .mockResolvedValueOnce(data);

      let res = await service.calculate(1, 3000, 20);
      expect(res).toHaveProperty('scoring', 100);
    });
  });
});
