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

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ type: 'datetime', nullable: false })
  sentAt: Date;

  @Column({ type: 'nvarchar', length: '10', nullable: false })
  role: string;

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
  // @JoinColumn({ name: "PruebaId" })
  client: any;
}
