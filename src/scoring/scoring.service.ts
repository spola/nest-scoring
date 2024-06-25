import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { IsNull, LessThan, Or, Repository } from 'typeorm';
import { MessageEntity } from '../clients/entities/message.entity';
// import { ClientToDoFollowUpView } from './entities/client-to-do-follow-up-view.entity';

@Injectable()
export class ScoringService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    // @InjectRepository(ClientToDoFollowUpView)
    // private clientToDoFollowUpView: Repository<ClientToDoFollowUpView>,
  ) {}

  
}
