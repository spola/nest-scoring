import { ClientEntity } from '../entities/client.entity';
import { MessageEntity } from '../entities/message.entity';
import { ClientDto } from './client.dto';
import { MessageDto } from './message.dto';

export const transformClientEntityToDto = (
  entity: ClientEntity,
): ClientDto => {
    let dto = new ClientDto();
    
    dto.id = entity.id;
    dto.name = entity.name;
    dto.rut = entity.rut;
    dto.salary = entity.salary;
    dto.savings = entity.savings;

    dto.messages = entity.messages?.map(m=>transformMessageEntityToDto(m));

    return dto;
};

export const transformMessageEntityToDto = (
  entity: MessageEntity,
): MessageDto => {
    let dto = new MessageDto();
    dto.id = entity.id;
    dto.text = entity.text;
    dto.role = entity.role;
    dto.sentAt = entity.sentAt;

    return dto;
};