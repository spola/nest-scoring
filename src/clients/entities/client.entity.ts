import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'nvarchar', length: '100', nullable: false })
  name: string;

  @Column({ type: 'nvarchar', length: '13', nullable: false })
  rut: string;

  @Column({ type: 'int' })
  salary: number;

  @Column({ type: 'int' })
  savings: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn({ select: false })
  version: number;

  @OneToMany((type) => MessageEntity, (message) => message.client, {
    cascade: true,
  })
  messages: MessageEntity[];
}
