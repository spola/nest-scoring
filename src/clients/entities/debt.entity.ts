import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('debts')
export class DebtEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'nvarchar', length: '100', nullable: false })
  institution: string;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column({ type: 'datetime', nullable: false })
  dueDate: Date;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn({ select: false })
  version: number;

  @ManyToOne((type) => ClientEntity, (client) => client.messages, {
    cascade: false,
  })
  client: any;
}
