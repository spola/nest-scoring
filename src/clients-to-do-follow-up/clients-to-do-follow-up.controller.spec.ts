import { Test, TestingModule } from '@nestjs/testing';
import { ClientsToDoFollowUpController } from './clients-to-do-follow-up.controller';
import { ClientsToDoFollowUpService } from './clients-to-do-follow-up.service';
import { ClientEntity } from '../clients/entities/client.entity';

describe('ClientsToDoFollowUpController', () => {
  let controller: ClientsToDoFollowUpController;
  let service: ClientsToDoFollowUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsToDoFollowUpController],
      providers: [
        {
          provide: ClientsToDoFollowUpService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientsToDoFollowUpController>(
      ClientsToDoFollowUpController,
    );
    service = module.get<ClientsToDoFollowUpService>(
      ClientsToDoFollowUpService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list clients empty list', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([] as ClientEntity[]);
    expect(controller.findAll()).resolves.toHaveLength(0);
  });

  it('should list clients dto', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([
      {
        id: 1000,
        name: 'Alexis Vidal',
        salary: 10000,
        messages: [{}],
        debts: [null],
      },
    ] as ClientEntity[]);

    var response = await controller.findAll();

    expect(response).toHaveLength(1);
    expect(response[0]).not.toHaveProperty('messages');
    expect(response[0]).not.toHaveProperty('debts');
  });
});
