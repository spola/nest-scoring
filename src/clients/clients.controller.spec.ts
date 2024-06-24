import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  function initData() {
    let createdEntity: ClientEntity = new ClientEntity();
    createdEntity.id = 10000;

    let createDto: CreateClientDto = new CreateClientDto();

    return {
      createdEntity: createdEntity,
      createDto: createDto,
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
            create: jest.fn().mockResolvedValue(data.createdEntity),
            findOne: jest.fn().mockResolvedValue(data.createdEntity),
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

  it('should create client', async () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(data.createdEntity);
    expect(controller.create(data.createDto)).resolves.toHaveProperty("id", 10000);
  });
  it('should get client', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(data.createdEntity);
    expect(controller.findOne(10000)).resolves.toHaveProperty("id", 10000);
  });
});
