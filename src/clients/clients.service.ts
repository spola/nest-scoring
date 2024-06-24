import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  /**
   * Create client
   * @param createClientDto Parameter
   * @returns ClientEntity Created entity
   */
  async create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const newClient = await this.clientRepository.save({
      ...createClientDto,
    });

    return newClient;
  }

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.find({
      //relations: ['detalles'],
      where: {
        deleted_at: IsNull(),
      },
    });
  }

  async findOne(id: number): Promise<ClientEntity> {
    const found = await this.clientRepository.findOne({
      relations: ["messages", "debts"],
      where: { id: id, deleted_at: IsNull() },
    });
    if (!found) {
      throw new NotFoundException(`Client "${id}" not found`);
    }
    return found;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
