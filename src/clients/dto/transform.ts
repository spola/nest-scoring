import { ClientEntity } from '../entities/client.entity';
import { DebtEntity } from '../entities/debt.entity';
import { MessageEntity } from '../entities/message.entity';
import { ClientDto, ClientDtoProperties } from './client.dto';
import { DebtDto } from './debt.dto';
import { MessageDto } from './message.dto';

export const transformClientEntityToDtoProperties = (
  entity: ClientEntity,
): ClientDtoProperties => {
    let dto = new ClientDtoProperties();
    
    dto.id = entity.id;
    dto.name = entity.name;
    dto.rut = entity.rut;
    dto.salary = entity.salary;
    dto.savings = entity.savings;

    return dto;
};

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
    dto.debts = entity.debts?.map(d=>transformDebtEntityToDto(d));

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

export const transformDebtEntityToDto = (
  entity: DebtEntity,
): DebtDto => {
    let dto = new DebtDto();
    dto.id = entity.id;
    dto.amount = entity.amount;
    dto.dueDate = entity.dueDate;
    dto.institution = entity.institution;

    return dto;
};