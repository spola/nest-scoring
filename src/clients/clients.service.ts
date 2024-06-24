import { Injectable, NotImplementedException } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
