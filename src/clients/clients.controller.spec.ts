import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  function initData() {
    let createDTO: CreateClientDto = new CreateClientDto();
    //createDTO.id = 10000;

    return {
      createDTO: createDTO,
    };
  }
  let data = initData();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            create: jest.fn().mockResolvedValue(data.createDTO),
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list clients', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([] as ClientEntity[]);
    expect(controller.findAll()).resolves.toHaveLength(0);
  });
});
