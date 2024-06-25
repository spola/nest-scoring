import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { IsNull, LessThan, Or, Repository } from 'typeorm';
import { MessageEntity } from 'src/clients/entities/message.entity';
import { ClientToDoFollowUpView } from './entities/client-to-do-follow-up-view.entity';

/**
 * Service for Clients To Do Follow Up
 */
@Injectable()
export class ClientsToDoFollowUpService {
  private static readonly DAYS_TO_FOLLOW_UP = 7;

  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientToDoFollowUpView)
    private clientToDoFollowUpView: Repository<ClientToDoFollowUpView>,
  ) {}

  /**
   * Returns the date used to find the clients to do the follow up.
   * @returns Date to search
   */
  private getDateToSearch(): Date {
    let now = new Date();
    const daysToSubtract = ClientsToDoFollowUpService.DAYS_TO_FOLLOW_UP;
    now.setDate(now.getDate() - daysToSubtract);

    return now;
  }

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

    let date = this.getDateToSearch();

    return data.then((clients) =>
      clients.filter((c) => c.fecha == null || c.fecha <= date),
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
    let date = this.getDateToSearch();

    let data = this.clientToDoFollowUpView.find({
      where: {
        date: Or(LessThan(date), IsNull()),
      },
    });

    return data.then((clients) => clients as unknown as ClientEntity[]);
  }
}
