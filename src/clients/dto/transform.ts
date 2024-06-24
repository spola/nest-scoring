import { ClientEntity } from '../entities/client.entity';
import { ClientDto } from './client.dto';

export const transformClientEntityToDto = (
  entity: ClientEntity,
): ClientDto => {
    let dto = new ClientDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.rut = entity.rut;
    dto.salary = entity.salary;
    dto.savings = entity.savings;

    return dto;
};
