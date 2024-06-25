import { Module } from '@nestjs/common';
import { ClientsToDoFollowUpService } from './clients-to-do-follow-up.service';
import { ClientsToDoFollowUpController } from './clients-to-do-follow-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { MessageEntity } from '../clients/entities/message.entity';
import { ClientToDoFollowUpView } from './entities/client-to-do-follow-up-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, MessageEntity, ClientToDoFollowUpView])],
  controllers: [ClientsToDoFollowUpController],
  providers: [ClientsToDoFollowUpService],
})
export class ClientsToDoFollowUpModule {}
