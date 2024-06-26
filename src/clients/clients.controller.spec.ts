import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { ScoringService } from '../scoring/scoring.service';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;
  let scoringService: ScoringService;

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
        {
          provide: ScoringService,
          useValue: {
            calculate: jest.fn().mockResolvedValue({ scoring: 10 }),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
    scoringService = module.get<ScoringService>(ScoringService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(scoringService).toBeDefined();
  });

  it('should list clients', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([] as ClientEntity[]);
    expect(controller.findAll()).resolves.toHaveLength(0);
  });

  describe('should create client', () => {

    let param;

    beforeEach(() => {
      param = {
        id: 10,
        name: 'name',
        rut: 'rut',
        salary: 1000,
        savings: 4000,
        messages: [
          {
            id:10,
            text: "text",
            role: "role",
            sentAt: new Date()
          }
        ],
        debts: [
          {
            id:10,
            institution: "text",
            amount: 1000,
            sentAt: new Date()
          }
        ]
      };
    })

    it('ok', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(data.createdEntity);
      expect(controller.create(data.createDto)).resolves.toHaveProperty(
        'id',
        10000,
      );
    });

    it('eliminating the ids nested', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(data.createdEntity);

      expect(
        controller.create(param as any as CreateClientDto),
      ).resolves.toHaveProperty('id', 10000);

      expect(param).not.toHaveProperty('id');
      expect(param.messages[0]).not.toHaveProperty('id');
      expect(param.debts[0]).not.toHaveProperty('id');
    });

    it('eliminating the id of client, other nulls', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(data.createdEntity);

      let {messages, debts, ...params} = param;

      expect(
        controller.create(params as any as CreateClientDto),
      ).resolves.toHaveProperty('id', 10000);

      expect(params).not.toHaveProperty('id');
    });
  });
  it('should get client', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(data.createdEntity);
    expect(controller.findOne(10000)).resolves.toHaveProperty('id', 10000);
  });
});
