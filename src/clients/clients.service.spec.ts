import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClientsService', () => {
  let service: ClientsService;

  let clientRepository: Repository<ClientEntity>;
  let clientRepositoryToken: string | Function = getRepositoryToken(ClientEntity);


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService,
        {
          provide: clientRepositoryToken,
          useClass: Repository,
          useValue: {
            
          }
        }
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
