import { ClientEntity } from 'src/clients/entities/client.entity';
import { MessageEntity } from 'src/clients/entities/message.entity';
import { DataSource, ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('c.id, c.name, c.rut, c.salary, c.savings')
      .addSelect('MAX(m.sentAt)', 'date')
      .from(ClientEntity, 'c')
      .leftJoin(MessageEntity, 'm', 'c.id = m.clientid')
      .groupBy('c.id, c.name, c.rut, c.salary, c.savings')
      .addGroupBy('m.clientId'),
})
export class ClientToDoFollowUpView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  rut: string;

  @ViewColumn()
  salary: number;

  @ViewColumn()
  savings: number;

  @ViewColumn()
  date: Date;
}
