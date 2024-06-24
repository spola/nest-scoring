import { Module } from '@nestjs/common';
import { ClientsToDoFollowUpService } from './clients-to-do-follow-up.service';
import { ClientsToDoFollowUpController } from './clients-to-do-follow-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { MessageEntity } from '../clients/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, MessageEntity])],
  controllers: [ClientsToDoFollowUpController],
  providers: [ClientsToDoFollowUpService],
})
export class ClientsToDoFollowUpModule {}
