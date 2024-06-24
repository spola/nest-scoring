import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

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
    clientRepository = module.get<Repository<ClientEntity>>(clientRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("when find one client", () => {
    it("should find it", async () => {
      let cliente = new ClientEntity();
      cliente.id = 1;
      jest.spyOn(clientRepository, "findOne").mockResolvedValueOnce(cliente);

      expect(service.findOne(1)).resolves.toHaveProperty("id", 1);
    });

    it("should throw not found", async () => {
      jest.spyOn(clientRepository, "findOne").mockResolvedValueOnce(null);

      expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
