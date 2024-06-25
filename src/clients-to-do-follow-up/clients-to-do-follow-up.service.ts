import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { Repository } from 'typeorm';
import { MessageEntity } from 'src/clients/entities/message.entity';

/**
 * Service for Clients To Do Follow Up
 */
@Injectable()
export class ClientsToDoFollowUpService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  /**
   * Return the list of clients
   *
   * @remarks
   * All the clients whitout a message in the last 7 days.
   *
   * This version use the query builder.
   *
   * @return Array of clients
   */
  async findAllQueryBuilder(): Promise<ClientEntity[]> {
    
    let data = this.clientRepository
      .createQueryBuilder('c')
      .leftJoin(MessageEntity, 'm', 'c.id = m.clientid')
      .select('c.id, c.name, c.rut, c.salary, c.savings')
      .addSelect('MAX(m.sentAt)', 'fecha')
      .addSelect('m.clientId', 'clientId')
      .groupBy('c.id, c.name, c.rut, c.salary, c.savings')
      .addGroupBy('m.clientId')
      .getRawMany();

    let now = new Date();
    const daysToSubtract = 7;

    return data.then((clients) =>
      clients.filter((c) => c.fecha == null || c.fecha <= now),
    );
  }

  /**
   * Return the list of clients
   *
   * @remarks
   * All the clients whitout a message in the last 7 days.
   *
   * This version use the database view precalculated data.
   *
   * @return Array of clients
   */
  async findAll(): Promise<ClientEntity[]> {
    
    let data = this.clientRepository
      .createQueryBuilder('c')
      .leftJoin(MessageEntity, 'm', 'c.id = m.clientid')
      .select('c.id, c.name, c.rut, c.salary, c.savings')
      .addSelect('MAX(m.sentAt)', 'fecha')
      .addSelect('m.clientId', 'clientId')
      .groupBy('c.id, c.name, c.rut, c.salary, c.savings')
      .addGroupBy('m.clientId')
      .getRawMany();

    let now = new Date();
    const daysToSubtract = 7;

    return data.then((clients) =>
      clients.filter((c) => c.fecha == null || c.fecha <= now),
    );
  }
}
