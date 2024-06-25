import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { MessageEntity } from '../clients/entities/message.entity';
import { DebtEntity } from '../clients/entities/debt.entity';

import { ScoringService } from './scoring.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, MessageEntity, DebtEntity/*, ClientToDoFollowUpView*/])],
  providers: [ScoringService]
})
export class ScoringModule {}
