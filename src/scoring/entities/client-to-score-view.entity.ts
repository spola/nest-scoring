import { DebtEntity } from '../../clients/entities/debt.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { MessageEntity } from '../../clients/entities/message.entity';
import { DataSource, ViewColumn, ViewEntity } from 'typeorm';

//Nota: Este archivo no tiene formateo automático de código, queda ilegible

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("c.id", 'id')
      .addSelect((qb) => qb.select( "count(m.id)").from(MessageEntity, 'm').where('m.clientId = c.id'), 'total_messages')
      .addSelect((qb) => qb.select( "count(m.id)").from(MessageEntity, 'm').where('m.sentAt >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND m.clientId = c.id'), 'last_messages')
      .addSelect('c.salary')
      .addSelect('c.savings')
      .addSelect((qb) => qb.select( "sum(d.amount)").from(DebtEntity, 'd').where('d.clientId = c.id'), 'total_debts')
      .addSelect((qb) => qb.select( "count(1)").from(DebtEntity, 'd').where('d.clientId = c.id'), 'count_debts')
      .from(ClientEntity, 'c'),
})
export class ClientToScoreView {
  @ViewColumn()
  id: number;

  @ViewColumn({name:'total_messages'})
  totalMessages: number;

  @ViewColumn({name:'last_messages'})
  lastMessages: number;

  @ViewColumn()
  salary: number;

  @ViewColumn()
  savings: number;

  @ViewColumn({name:'total_debts'})
  totalDebts: number;

  @ViewColumn({name:'count_debts'})
  countDebts: number;
}
