import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientEntity } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoringService } from '../scoring/scoring.service';
import { ScoringModule } from '../scoring/scoring.module';
import { ClientToScoreView } from '../scoring/entities/client-to-score-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, ClientToScoreView]), ScoringModule],
  controllers: [ClientsController],
  providers: [ClientsService, ScoringService],
})
export class ClientsModule {}
