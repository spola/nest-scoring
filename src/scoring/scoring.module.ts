import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { MessageEntity } from '../clients/entities/message.entity';
import { DebtEntity } from '../clients/entities/debt.entity';

import { ScoringService } from './scoring.service';
import { ClientToScoreView } from './entities/client-to-score-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, MessageEntity, DebtEntity, ClientToScoreView])],
  providers: [ScoringService]
})
export class ScoringModule {}
