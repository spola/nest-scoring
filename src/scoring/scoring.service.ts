import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { IsNull, LessThan, Or, Repository } from 'typeorm';
import { MessageEntity } from '../clients/entities/message.entity';
import { ClientToScoreView } from './entities/client-to-score-view.entity';
// import { ClientToDoFollowUpView } from './entities/client-to-do-follow-up-view.entity';

@Injectable()
export class ScoringService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientToScoreView)
    private clientToDoFollowUpView: Repository<ClientToScoreView>,
  ) {}

//   calculate(id: number): { scoring: number } {
//     let scoring = 0;

//     return {
//       scoring,
//     };
//   }
}
